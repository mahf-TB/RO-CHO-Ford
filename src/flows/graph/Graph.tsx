import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  Viewport,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { createNewNode, nodeTypes } from "../nodes";
import { edgeTypes } from "../edges";

import CustomConnectionLine from "./CustomConnectionLine";
import useStoreFlow from "@/store/storeFlow";
// import { updateNodesAndEdges } from ".";

const connectionLineStyle = {
  stroke: "#4090F6",
  strokeWidth: 2,
};

const defaultEdgeOptions = {
  type: "floating",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 10,
    height: 10,
  },
};

const defaultViewport: Viewport = { x: 10, y: 15, zoom: 0.7 };

export default function Graph() {
  const { screenToFlowPosition } = useReactFlow();
  const { nodes, edges, setNodes, onNodesChange, onEdgesChange, onConnect } =
    useStoreFlow();

  
  // updateNodesAndEdges(nodes, edges);
  // ➕ Fonction pour ajouter un nœud après un drop
  const onDrop = (event: any) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData("application/reactflow");
    const { clientX, clientY } =
      "changedTouches" in event ? event.changedTouches[0] : event;
    if (!nodeType) return;
    createNewNode(
      nodes,
      setNodes,
      nodeType,
      clientX,
      clientY,
      screenToFlowPosition
    );
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div className="h-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        // Nodes
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        // Edges
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        // Autre Props
        onConnect={onConnect}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineComponent={CustomConnectionLine}
        connectionLineStyle={connectionLineStyle}
        defaultViewport={defaultViewport}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
