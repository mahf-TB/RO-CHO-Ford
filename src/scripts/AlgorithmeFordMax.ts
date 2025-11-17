import { AppNode } from "@/types/type";
import { type Edge } from "@xyflow/react";



export interface Result {
  i: string;
  j: string;
  lambdaI: number;
  lambdaJ: number;
  vArc: number;
}




export const bellmanFordMaximum = (
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
    lambda[node.id] = node.id === sourceId ? 0 : 0;
  });

  // Trier les arêtes pour un traitement stable
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
      const weight = Number(label); // V(xi, xj)

      if (lambda[Xi] !== Infinity) {

        results.push({
          i: source,
          j: target,
          lambdaI: lambda[Xi],
          lambdaJ: lambda[Xj],
          vArc: weight,
        });

        let lambdaIJ = lambda[Xj] - lambda[Xi]; // (λj - λi)
       

        if (lambdaIJ < weight) { // premier modification
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



export const removeCycles = (edges: Edge[]): Edge[] => {
  const graph: { [key: string]: Edge[] } = {};

  // Construire l’adjacency list
  edges.forEach(edge => {
    if (!graph[edge.source]) graph[edge.source] = [];
    graph[edge.source].push(edge);
  });

  const visited = new Set<string>();
  const stack = new Set<string>();
  const toRemove = new Set<string>();

  // DFS pour détecter les cycles
  const dfs = (node: string, path: Edge[]) => {
    if (stack.has(node)) {
      // cycle trouvé
      const cycleEdges = path.slice(path.findIndex(e => e.source === node));
      if (cycleEdges.length > 0) {
        // supprimer l’arête de poids minimum
        const minEdge = cycleEdges.reduce((min, e) =>
          parseInt(e.label) < parseInt(min.label) ? e : min
        );
        toRemove.add(minEdge.id);
      }
      return;
    }

    if (visited.has(node)) return;

    visited.add(node);
    stack.add(node);

    if (graph[node]) {
      for (const edge of graph[node]) {
        dfs(edge.target, [...path, edge]);
      }
    }

    stack.delete(node);
  };

  // Lancer DFS depuis chaque nœud
  Object.keys(graph).forEach(node => dfs(node, []));

  // Retourner les arêtes restantes
  return edges.filter(e => !toRemove.has(e.id));
};


