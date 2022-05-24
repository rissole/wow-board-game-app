import { createElement, ReactNode } from "react";

const RAW_DESCRPTION_TAG_NAME_MAP: { [k: string]: string } = { b: "strong", i: "em" };

export function rawDescriptionToReact(rawDescription: string): ReactNode[] {
  return rawDescriptionToReactRecursive(rawDescription).nodes;
}

function rawDescriptionToReactRecursive(rawDescription: string): {
  nodes: ReactNode[];
  stringLeft: string;
} {
  const nodes: ReactNode[] = [];
  let stringLeftToProcess: string = rawDescription;
  let processedString: string = "";

  for (let i = processedString.length; i < stringLeftToProcess.length; i++) {
    processedString += stringLeftToProcess[i];
    const stringChunk = processedString.slice(processedString.length - 3);

    //See if we're dealing with a tag, if not continue to process string
    if (stringChunk.startsWith("</") || (stringChunk.startsWith("<") && stringChunk.endsWith(">"))) {
      //We're dealing with luke's crazy paragraph things
      if (stringChunk === "</p") {
        nodes.push(processedString.slice(0, processedString.length - 3), createElement("p"));
        stringLeftToProcess = stringLeftToProcess.slice(i + 1);
        //If we're dealing with a closing tag, we've closed off the element, so we can return.
      } else if (stringChunk.startsWith("</")) {
        nodes.push(processedString.slice(0, processedString.length - 3));
        return { nodes, stringLeft: stringLeftToProcess.slice(i + 1) };
        // We know we're dealing with an opening tag
      } else {
        nodes.push(processedString.slice(0, processedString.length - 3));
        //Get all the nested nodes under this tag, then append as element
        const nestedNodes = rawDescriptionToReactRecursive(stringLeftToProcess.slice(i + 1));
        nodes.push(createElement(RAW_DESCRPTION_TAG_NAME_MAP[stringChunk[1]!]!, {}, nestedNodes.nodes));
        stringLeftToProcess = nestedNodes.stringLeft;
      }
      //reset process
      processedString = "";
      i = 0;
    }
  }

  nodes.push(processedString);
  return { nodes, stringLeft: "" };
}
