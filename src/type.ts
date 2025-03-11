import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";

export type AppNode = Node;

export type NodeEdges = any & {
  edges: Edge[]; // Liste des arêtes associées au nœud
};

export type AppState = {
  nodes: AppNode[];
  edges: Edge[];
  nodeEdges: () => NodeEdges[];
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNode: (id: String,  newData:any) => void;
  updateEdge: (id: String,  newData:any) => void;
  getOneNodeOrEdges: (id : string) => any
};


export type SideStoreState = {
  idOpen: string;
  sideOpen: boolean;
  setIdOpen: (idOpen: string) => void;
  setSideOpen: (sideOpen: boolean) => void;
};