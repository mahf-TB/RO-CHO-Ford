// components/EdgeLabelInput.tsx
import { useEffect, useRef, useState } from "react";
import {
  getBezierPath,
  getStraightPath,
  Position,
  useInternalNode,
  useReactFlow,
} from "@xyflow/react";
import useStoreFlow from "@/store/storeFlow";
import { getEdgeParams } from "./utils";
// import useStoreFlow from "@/stores/useStoreFlow";

export default function InputEdgeLabel() {
  const { edges, labelInputEdgeId } = useStoreFlow();

  const edge = edges.find((e) => e.id === labelInputEdgeId);

  if (!edge) return null;

  return <InputEdgeLabelForm edge={edge} />;
}

function InputEdgeLabelForm({ edge }: any) {
  const { edges, setEdges, setLabelInputEdgeId, labelInputEdgeId } =
    useStoreFlow();
  const [label, setLabel] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { getNode } = useReactFlow();

  // Toujours appeler les hooks au même endroit
  const sourceNode = getNode(edge?.source);
  const targetNode = getNode(edge?.target);

  console.log("sourceNode", sourceNode);

  if (!edge || !sourceNode || !targetNode) return null;

  const handleSubmit = () => {
    setEdges(
      edges.map((e) => (e.id === labelInputEdgeId ? { ...e, label } : e))
    );
    setLabel("");
    setLabelInputEdgeId("");
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div
      style={{
        position: "fixed", // centre la modal à l’écran
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        background: "white",
        padding: "12px 16px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        minWidth: "220px",
      }}
    >
      {/* Affichage des nœuds liés */}
      <div className="mb-2 text-sm text-gray-700">
        Arête : X<sub>{sourceNode.id}</sub> → X<sub>{targetNode.id}</sub>
      </div>

      <input
        ref={inputRef}
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onBlur={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        placeholder="Valeur..."
        className="px-2 py-1 border border-gray-300 rounded text-sm "
      />
    </div>
  );
}
