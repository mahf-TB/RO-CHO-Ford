import { type Node, type NodeTypes } from "@xyflow/react";
import { CustomNode } from "./CustomNode";
import { InputNode } from "./InputNode";
import { OutputNode } from "./OutputNode";
import { GreenNode } from "./GreenNode";

export const initialNodes: Node[] = [
 {
    id: "1",
    type: "entrer",
    position: { x: 50, y: 250 },
    measured: { width: 124, height: 124 },
    data: { label: "Debut" },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 375, y: 105 },
    measured: { width: 124, height: 124 },
    data: { label: "Noeud 2" },
  },
  {
    id: "3",
    type: "custom",
    position: { x: 500, y: 550 },
    measured: { width: 124, height: 124 },
    data: { label: "Noeud 3" },
  },
  {
    id: "4",
    type: "custom",
    position: { x: 725, y: 240 },
    measured: { width: 124, height: 124 },
    data: { label: "Noeud 4" },
  },
  {
    id: "5",
    type: "custom",
    position: { x: 750, y: -55 },
    measured: { width: 124, height: 124 },
    data: { label: "Noeud 5" },
  },
  {
    id: "6",
    type: "custom",
    position: { x: 875, y: 470 },
    measured: { width: 124, height: 124 },
    data: { label: "Noeud 6" },
  },
  {
    id: "7",
    type: "custom",
    position: { x: 1000, y: -85 },
    measured: { width: 124, height: 124 },
    data: { label: "Noeud 7" },
  },
  {
    id: "8",
    type: "custom",
    position: { x: 1125, y: 410 },
    measured: { width: 124, height: 124 },
    data: { label: "Noeud 8" },
  },
  {
    id: "9",
    type: "sortie",
    position: { x: 1250, y: 110 },
    measured: { width: 124, height: 124 },
    data: { label: "Noeud 9" },
  },
];

// Fonction pour créer un nouveau nœud
export const createNewNode = (
  nodes: Node[],
  setNodes: (nodes: Node[]) => void,
  nodeType: string,
  clientX: number,
  clientY: number,
  screenToFlowPosition: any
) => {
  const existingIds = nodes
    .map((node) => parseInt(node.id, 10))
    .filter((id) => !isNaN(id));
  const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
  // Trouver le plus grand ID existant et ajouter 1
  const newNode = {
    id: `${newId}`, // ID unique basé sur le max
    type: nodeType,
    position: screenToFlowPosition({
      x: clientX - 50,
      y: clientY - 50,
    }),
    data: {
      label:
        nodeType === "sortie"
          ? "Sortie"
          : nodeType === "entrer"
          ? "Debut"
          : `Noeud ${newId}`,
    },
  };

  setNodes([...nodes, newNode]);
};

export const nodeTypes = {
  custom: CustomNode,
  entrer: InputNode,
  sortie: OutputNode,
  greenaway: GreenNode,
} satisfies NodeTypes;
