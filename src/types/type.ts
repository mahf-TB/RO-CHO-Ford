import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";
import { Result } from "../scripts/AlgorithmeFordMin";

export type AppNode = Node;

export type NodeEdges = any & {
  edges: Edge[]; // Liste des arêtes associées au nœud
};

export type AppState = {
  nodes: AppNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  nodeEdges: () => NodeEdges[];
  updateNode: (id: String, newData: any) => void;
  updateEdge: (id: String, newData: any) => void;
  updateEdgeType: (edgeIds: string[], animated: boolean) => void;
  getOneNodeOrEdges: (id: string) => any;
  editingEdgeId: string;
  setEditingEdgeId: (editingEdgeId: string) => void;
  labelInputEdgeId: string;
  setLabelInputEdgeId: (editingEdgeId: string) => void;
  typeAlgo:string;
  setTypeAlgo : (type: string) => void;
};

export type SideStoreState = {
  idOpen: string;
  sideOpen: boolean;
  logOpen: boolean;
  resTable: Result[]; 
  setResTable: (resTable: Result[]) => void;
  setIdOpen: (idOpen: string) => void;
  setSideOpen: (sideOpen: boolean) => void;
  setLogOpen: (logOpen: boolean) => void;
};
 