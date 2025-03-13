import {
  Handle,
  Position,
  type NodeProps,
  useConnection,
  useReactFlow,
} from "@xyflow/react";
import { type PositionLoggerNode } from "./types";
import Dropdown, { DropdownItems } from "@/components/utils/Dropdown";
import { useState } from "react";
import { PenBox, Trash } from "lucide-react";
import useSideStore from "@/store/sideStore";

export function InputNode({
  data,
  id,
  selected,
}: NodeProps<PositionLoggerNode>) {
  const connection = useConnection();
  const { getNodes, setNodes, getEdges, setEdges } = useReactFlow();
  const { setIdOpen } = useSideStore();
  const [open, setOpen] = useState(false);

  const handleMenuClickDroit = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleDelete = (e: any) => {
    setNodes(getNodes().filter((node) => node.id !== e));
    setEdges(
      getEdges().filter((edge) => edge.source !== e && edge.target !== e)
    );
  };

  return (
    <div
      className={`border-2 p-5  rounded-full flex flex-col items-center ${
        selected ? "border-blue-500" : "border-yellow-300"
      }`}
      onContextMenu={handleMenuClickDroit}
      onClick={() => setIdOpen(id)}
    >
      {/* <span> {id}</span> */}
      <div className=" w-20 h-20 font-bold relative rounded-full flex items-center justify-center bg-yellow-500">
        {!connection.inProgress && (
          <Handle
            className="customHandle"
            position={Position.Right}
            type="source"
          />
        )}

          <div className="absolute text-red-500 -top-12">
            λ<sub>{id}</sub> = 0
          </div>
    
        {data.label && (
          <div className="flex flex-col items-center text-white">
            <span>
              X<sub>{id}</sub>
            </span>
            <span className="text-xs text-gray-100">{data.label}</span>
          </div>
        )}
      </div>

      {/* Dropdown pour Modifier et supprimer */}
      <Dropdown open={open} setOpen={setOpen}>
        <DropdownItems icon={<PenBox size={16} />} title="Modifier" />
        <DropdownItems
          icon={<Trash size={16} color="red" />}
          onClick={() => handleDelete(id)}
          style={"text-red-600"}
          title={"Supprimer"}
        />
      </Dropdown>
    </div>
  );
}
