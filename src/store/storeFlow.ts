import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import { AppState } from "@/type";
import { initialNodes } from "@/nodes";
import { initialEdges } from "@/edges";

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStoreFlow = create<AppState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,

  // Fusionner nœuds et arêtes en fonction de la source
  nodeEdges: () => {
    return get().nodes.map((item) => {
      const edges = get().edges.filter((eds) => eds.source === item.id);
      return {
        ...item,
        edges,
      };
    });
  },

  getOneNodeOrEdges: (id) => {
    return (
      get().nodes.find((node) => node.id === id) ||
      get().edges.find((eds) => eds.id === id)
    );
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },

  
  // ✅ Met à jour un nœud spécifique
  updateNode: (id:any, newData:any) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...newData } } : node
      ),
    }));
  },


   // ✅ Met à jour une arête spécifique
   updateEdge: (id:any, newData:any) => {
    set((state) => ({
      edges: state.edges.map((edge) =>
        edge.id === id ? { ...edge, ...newData } : edge
      ),
    }));
  },


}));

export default useStoreFlow;
