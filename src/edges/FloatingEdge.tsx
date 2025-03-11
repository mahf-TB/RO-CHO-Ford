import {
  EdgeLabelRenderer,
  getStraightPath,
  useInternalNode,
} from "@xyflow/react";
import { getEdgeParams } from "./utils.ts";

function FloatingEdge({ id, source, target, label, selected }: any) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  // const handleLabelChange = (edgeId: string, newLabel: string) => {
  //   setEdges((edges) =>
  //     edges.map((edge) =>
  //       edge.id === edgeId ? { ...edge, label: newLabel } : edge
  //     )
  //   );
  // };

  
  const arrowColor = selected ? "#4090F6" : "#D2D5DB";

  return (
    <g>
      <defs>
        <marker
          id={id}
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M 0,0 L 10,5 L 0,10 z" fill={arrowColor} />
        </marker>
      </defs>
      <path
        id={id}
        d={edgePath}
        markerEnd={`url(#${id})`}
        className={` stroke-3  ${
          selected ? "stroke-blue-500" : "stroke-gray-400"
        }`}
      />
      {/* Label sur l'edge */}
      <EdgeLabelRenderer>
        {label && (
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: selected ? "#4489F6" : "white",
              color: selected ? "White" : "black",
              boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
            }}
            className="absolute nodrag nopan text-xs font-bold p-1 rounded-4xl shadow text-white border border-gray-500"
          >
            {label || "56"}
          </div>
        )}
      </EdgeLabelRenderer>
    </g>
  );
}

export default FloatingEdge;
