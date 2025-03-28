
import { AppNode } from "@/types/type";
import { type Edge } from "@xyflow/react";

export interface Result {
  i: string;
  j: string;
  lambdaI: number;
  lambdaJ: number;
  vArc: number;
}

export const bellmanFord = (
  nodes: AppNode[],
  edges: Edge[],
  sourceId: string
) => {
  if ((nodes.length === 0, edges.length === 0)) {
    console.log(nodes.length);
    return;
  }
  let lambda: { [key: string]: number } = {};
  let restartNode: string | null = null;
  let predecessor: { [key: string]: string | null } = {};
  const results: Result[] = [];

  // Initialisation des distances
  nodes.forEach((node) => {
    lambda[node.id] = node.id === sourceId ? 0 : Infinity;
  });

  edges.sort((a, b) => parseInt(a.source) - parseInt(b.source));
  console.log(edges);

  let updated = false;
  while (!updated) {
    let startIndex = 0;
    startIndex = restartNode
      ? edges.findIndex((e) => e.source === restartNode)
      : 0;
    restartNode = null;

    for (let i = startIndex; i < edges.length; i++) {
      const { source, target, label } = edges[i];
      if (!label) {
        alert("Error laben non fourni")
        return;
      }
      const Xi = parseInt(source, 10);
      const Xj = parseInt(target, 10);
      const weight = Number(label);

      if (lambda[Xi] !== Infinity) {

        results.push({
          i: source,
          j: target,
          lambdaI: lambda[Xi],
          lambdaJ: lambda[Xj],
          vArc: weight,
        });

        let lambdaIJ = lambda[Xj] - lambda[Xi];
       

        if (lambdaIJ > weight) {
          lambda[Xj] = lambda[Xi] + weight;
          predecessor[target] = source;
          updated = true;

          if (Xi > Xj) {
            console.log(`🔄 Recommencer la boucle en X${Xj}`);
            restartNode = target;
            updated = false;
            break;
          }
        }
      }
    }
  }

  return { lambda, results, predecessor };
};

/**
 * Trouve les arêtes du plus court chemin vers un nœud cible.
 */
export const findShortestPathEdges = (
  edges: Edge[],
  predecessor: { [key: string]: string | null },
  targetId: string,
  sourceId: string
) => {
  const shortestPathEdgeIds: string[] = [];

  let currentId = targetId;

  while (currentId !== sourceId && predecessor[currentId] !== null) {
    const prevId = predecessor[currentId] || null;

    const edge = edges.find(
      (e) => e.source === prevId && e.target === currentId
    );

    if (edge) {
      shortestPathEdgeIds.unshift(edge.id);
    }

    currentId = prevId!;
  }

  return shortestPathEdgeIds;
};
