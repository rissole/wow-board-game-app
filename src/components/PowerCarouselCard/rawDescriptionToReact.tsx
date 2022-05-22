import { createElement, ReactNode } from "react";

const RAW_DESCRPTION_TAG_NAME_MAP: { [k: string]: string } = { b: "strong", i: "em" };

export function rawDescriptionToReact(rawDescription: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let currentConstructingNodeIndex = 0;
  let constructingNode: { tagName: string; currentText: string } | null = null;
  for (let i = 0; i < rawDescription.length; ++i) {
    const c = rawDescription[i]!;

    if (c === "<") {
      // if we come across an opening tag, look ahead to see what kind it is

      if ((rawDescription[i + 1] === "b" || rawDescription[i + 1] === "i") && rawDescription[i + 2] === ">") {
        // opening b or i tag. we don't support nested nodes hence just singleton constructingNode

        constructingNode = { tagName: rawDescription[i + 1]!, currentText: "" };
        i += 2;
      } else if (rawDescription[i + 1] === "/" && rawDescription[i + 3] === ">") {
        // closing tag (we only support tag names of length 1, hence just checking i+3 position for >)

        if (constructingNode?.tagName === rawDescription[i + 2]) {
          // check if we are closing the last tag we opened
          // if so, push on the node we've been building
          nodes.push(
            createElement(RAW_DESCRPTION_TAG_NAME_MAP[constructingNode!.tagName]!, null, constructingNode!.currentText)
          );
          constructingNode = null;
          currentConstructingNodeIndex += 2;
        } else if (rawDescription[i + 2] === "p") {
          // or if it's just </p> which in luke's cooked brain means add 2 lines
          nodes.push(createElement("p"));
          currentConstructingNodeIndex += 1;
        } else {
          throw new Error(`Unrecognized closing element ${rawDescription[i + 2]}`);
        }

        i += 3;
      } else {
        throw new Error(`Unrecognized tag ${rawDescription.substring(i, i + 3)}`);
      }
    } else {
      // not an opening tag, so we just want to append the character to the
      // node or raw string we're building

      if (nodes[currentConstructingNodeIndex] === undefined) {
        // if we're not building any element (like not inside a <b> or something)
        // the node we're currently "building" may be empty, so we init a raw string here
        nodes[currentConstructingNodeIndex] = "";
      }

      if (constructingNode !== null) {
        // if we're constructing a node, add the character there
        constructingNode.currentText += c;
      } else {
        // otherwise add the character to the raw string we must be building instead
        nodes[currentConstructingNodeIndex] += c;
      }
    }
  }
  return nodes;
}
