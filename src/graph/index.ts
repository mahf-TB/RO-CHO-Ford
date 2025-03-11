// import useStoreFlow from "@/store/storeFlow";
import { type Edge, type Node } from "@xyflow/react";

// Fonction pour réorganiser les nœuds et mettre à jour les arêtes
export const updateNodesAndEdges = (nodes: Node[], edges: Edge[]) => {
  // const { nodes, edges } = useStoreFlow();
  // Trier les nœuds par ID (convertir en nombre pour la comparaison correcte)
  nodes.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  // Réattribuer les ID aux nœuds
  let newId = 1;
  nodes.forEach((node) => {
    // node.data = { ...node.data, label: `X${newId}` };
    if (node.id === "1") {
      // S'assurer que le type "entrer" est toujours le nœud avec l'ID 1
      node.type = "entrer";
    }else{

    node.id = newId.toString();
    }
  

    newId++;
  });

  // setNodes(nodes)

  console.log(nodes);

  // Mettre à jour les arêtes avec les nouveaux ID des nœuds
  //   edges.forEach((edge) => {
  //     // Chercher les nœuds source et target à partir des nouveaux ID
  //     const sourceNode = nodes.find((node) => node.id === edge.source);
  //     const targetNode = nodes.find((node) => node.id === edge.target);

  //     // Si les nœuds source et target existent, mettre à jour les références dans l'arête
  //     if (sourceNode && targetNode) {
  //       edge.source = sourceNode.id;
  //       edge.target = targetNode.id;
  //     } else {
  //       // Si la référence à un nœud est invalide (nœud supprimé), supprimer l'arête
  //       const index = edges.indexOf(edge);
  //       if (index > -1) {
  //         edges.splice(index, 1);
  //       }
  //     }
  //   });

  return { updatedNodes: nodes, updatedEdges: edges };
};
