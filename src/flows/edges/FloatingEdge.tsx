import {
  EdgeLabelRenderer,
  getStraightPath,
  useInternalNode,
} from "@xyflow/react";
import { getEdgeParams } from "./utils.ts";
import useSideStore from "@/store/sideStore.ts";


function FloatingEdge({ id, source, target, label, selected  }: any) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  const { setIdOpen } = useSideStore();
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

  const arrowColor = selected ? "#4090F6" : "#D2D5DB";
  return (
    <g onClick={() => setIdOpen(id)} className="w-3">
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
          onClick={() => setIdOpen(id)}
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: selected ? "#4489F6" : "white",
              color: selected ? "White" : "black",
            }}
            className="absolute nodrag nopan text-sm cursor-default font-bold p-2 px-2.5 rounded-4xl shadow text-white border border-gray-500"
          >
            {label || "56"}
          </div>
        )}
      </EdgeLabelRenderer>
    </g>
  );
}

export default FloatingEdge;
