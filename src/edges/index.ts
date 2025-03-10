import { type Edge, type EdgeTypes } from '@xyflow/react';
import FloatingEdge from './FloatingEdge';

export const initialEdges: Edge[] = [
];

/**
 * Supprime une arête spécifique.
 */
export const deleteEdge = (edgeId: string, edges: Edge[]) => {
  return edges.filter((edge) => edge.id !== edgeId);
};

  // Fonction pour mettre à jour le label d'un edge

export const edgeTypes = {
  "floating": FloatingEdge, // Add your custom edge types here!
} satisfies EdgeTypes;
