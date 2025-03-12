import { type Node, type NodeTypes } from "@xyflow/react";
import { CustomNode } from "./CustomNode";
import { InputNode } from "./InputNode";
import { OutputNode } from "./OutputNode";

export const initialNodes: Node[] = [
 
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
          : `Noeud X${newId}`,
    },
  };

  setNodes([...nodes, newNode]);
};

export const nodeTypes = {
  custom: CustomNode,
  entrer: InputNode,
  sortie: OutputNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
