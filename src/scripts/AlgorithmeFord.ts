import { AppNode } from "@/type";
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
  let lambda: { [key: string]: number } = {};
  const results: Result[] = [];
  let restartNode: string | null = null;

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
    // for (const edge of edges) {
    for (let i = startIndex; i < edges.length; i++) {
      const { source, target, label } = edges[i];
      const Xi = parseInt(source, 10);
      const Xj = parseInt(target, 10);
      const weight = Number(label);

      if (lambda[Xi] !== Infinity) {
        const dataTable = {
          i: source,
          j: target,
          lambdaI: lambda[Xi],
          lambdaJ: lambda[Xj],
          vArc: weight,
        };

        let lambdaIJ = lambda[Xj] - lambda[Xi];
        results.push(dataTable);
        if (lambdaIJ > weight) {
          lambda[Xj] = lambda[Xi] + weight;
          updated = true;

          // console.log(`✅ Update  en X${Xj}`);
          if (Xi > Xj) {
            console.log(`🔄 Recommencer la boucle en X${Xj}`);
            restartNode = target;
            updated = false;
            break;
          }
        }
      }
    }

    // if (!updated) break; // Si aucune mise à jour n'a été faite, on arrête l'algorithme
  }

  console.log("✅ Résultat final de lambda:", lambda);
  const sortie = nodes.length.toString();
  // const path = findShortestPathEdges(results, sortie);
  // console.log("path mini :", path);

  return { lambda, results };
};


