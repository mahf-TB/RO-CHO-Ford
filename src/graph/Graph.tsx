import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  MarkerType,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { nodeTypes } from "../nodes";
import { edgeTypes } from "../edges";

import CustomConnectionLine from "./CustomConnectionLine";
import useStoreFlow from "@/store/storeFlow";

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

export default function Graph() {
  const { screenToFlowPosition } = useReactFlow();
  const { nodes, edges, setNodes, onNodesChange, onEdgesChange, onConnect } =
    useStoreFlow();

  // ➕ Fonction pour ajouter un nœud après un drop
  const onDrop = (event: any) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData("application/reactflow");
    const { clientX, clientY } =
      "changedTouches" in event ? event.changedTouches[0] : event;
    if (!nodeType) return;
    const existingIds = nodes
      .map((node) => parseInt(node.id, 10))
      .filter((id) => !isNaN(id));

    const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    // Trouver le plus grand ID existant et ajouter 1
    const newNode = {
      id: `${newId}`, // ID unique basé sur le max
      type: nodeType,
      position: screenToFlowPosition({
        x: clientX - 50,
        y: clientY - 50,
      }),
      data: { label: `X${newId}` },
    };

    setNodes([...nodes, newNode]);
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
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
