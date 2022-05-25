import { createElement, ReactNode } from "react";

const RAW_DESCRIPTION_TAG_NAME_MAP: { [k: string]: string } = { b: "strong", i: "em" };
const TAG_REGX: RegExp = /(<.{1,2}>)/;
const CLOSING_TAG_DELIMITER = "/";

export function rawDescriptionToReact(rawDescription: string): ReactNode[] {
  const rawNodes = splitIntoNodes(rawDescription);
  return parseRawNodes(rawNodes);
}

function splitIntoNodes(rawDescription: string): string[] {
  //split html into nodes while still retaining the insides of the tags
  return rawDescription.split(TAG_REGX);
}

function parseRawNodes(rawNodes: string[]): ReactNode[] {
  const reactNodes: ReactNode[] = [];

  for (let i = 0; i < rawNodes.length; i++) {
    const currentNode = rawNodes[i];
    if (currentNode === undefined) {
      throw new Error("Unable to locate current node");
    }

    //dealing with a tag
    if (currentNode.match(TAG_REGX)) {
      //dealing with an opening tag
      if (currentNode.length === 3) {
        const closingTag = currentNode.slice(0, 1) + CLOSING_TAG_DELIMITER + currentNode.slice(1);
        const endingTagIndex = rawNodes.findIndex((value, index) => index > i && value === closingTag);
        const nestedElement = rawNodes.slice(i + 1, endingTagIndex + 1);
        reactNodes.push(
          createElement(RAW_DESCRIPTION_TAG_NAME_MAP[currentNode[1]!]!, { key: i }, parseRawNodes(nestedElement))
        );
        i += nestedElement.length;
      } else if (currentNode === "</p>") {
        //dealing with a paragraph tag
        reactNodes.push(createElement("p", { key: i }));
      } else {
        //dealing with an end tag
        return reactNodes;
      }
    } else {
      //dealing with a text node
      reactNodes.push(currentNode);
    }
  }

  return reactNodes;
}
