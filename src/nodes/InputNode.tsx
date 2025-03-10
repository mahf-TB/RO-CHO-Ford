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
  
  export function InputNode({
    data,
    id,
    selected,
  }: NodeProps<PositionLoggerNode>) {
    const connection = useConnection();
    const { getNodes, setNodes, getEdges, setEdges } = useReactFlow();
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
      >
        {/* <span> {id}</span> */}
        <div className=" w-20 h-20 font-bold relative rounded-full flex items-center justify-center bg-yellow-300">
          {!connection.inProgress && (
            <Handle
              className="customHandle"
              position={Position.Right}
              type="source"
            />
          )}
  
          {data?.beta && (
            <div className="absolute text-red-500 -top-12">ß = 54</div>
          )}
          {data.label && <div className="text-white">{data.label}</div>}
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
  