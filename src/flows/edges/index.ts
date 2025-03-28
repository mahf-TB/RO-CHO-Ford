import { type Edge, type EdgeTypes } from "@xyflow/react";
import FloatingEdge from "./FloatingEdge";
import PathWayEdge from "./PathWayEdge";

export const initialEdges: Edge[] = [
  {
    id: "xy-edge__1-2",
    label: "5",
    source: "1",
    target: "2",
    type: "floating",
  },
  {
    id: "xy-edge__1-3",
    label: "3",
    source: "1",
    target: "3",
    type: "floating",
  },
  {
    id: "xy-edge__2-5",
    label: "5",
    source: "2",
    target: "5",
    type: "floating",
  },
  {
    id: "xy-edge__3-2",
    label: "7",
    source: "3",
    target: "2",
    type: "floating",
  },
  {
    id: "xy-edge__3-6",
    label: "5",
    source: "3",
    target: "6",
    type: "floating",
  },
  {
    id: "xy-edge__3-4",
    label: "6",
    source: "3",
    target: "4",
    type: "floating",
  },
  {
    id: "xy-edge__4-7",
    label: "7",
    source: "4",
    target: "7",
    type: "floating",
  },
  {
    id: "xy-edge__5-7",
    label: "5",
    source: "5",
    target: "7",
    type: "floating",
  },
  {
    id: "xy-edge__6-8",
    label: "3",
    source: "6",
    target: "8",
    type: "floating",
  },
  {
    id: "xy-edge__7-9",
    label: "5",
    source: "7",
    target: "9",
    type: "floating",
  },
  {
    id: "xy-edge__8-9",
    label: "5",
    source: "8",
    target: "9",
    type: "floating",
  },
];


/**
 * Supprime une arête spécifique.
 */
export const deleteEdge = (edgeId: string, edges: Edge[]) => {
  return edges.filter((edge) => edge.id !== edgeId);
};

// Fonction pour mettre à jour le label d'un edge

export const edgeTypes = {
  floating: FloatingEdge, // Add your custom edge types here!
  pathaway: PathWayEdge, 
} satisfies EdgeTypes;
