import { type Node, type NodeTypes } from "@xyflow/react";
import { CustomNode } from "./CustomNode";
import { InputNode } from "./InputNode";
import { OutputNode } from "./OutputNode";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "entrer",
    position: { x: 50, y: 250 },
    data: { label: "Debut" },
  },
];





export const nodeTypes = {
  custom: CustomNode,
  entrer: InputNode,
  sortie: OutputNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
