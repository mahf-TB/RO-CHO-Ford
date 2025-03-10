import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, Spline } from "lucide-react";
import useSideStore from "@/store/sideStore";

interface EdgeItem {
  id: string;
  label: string;
}

interface ItemsCollapsibleProps {
  title: string;
  id: string;
  edges: EdgeItem[];
}

const ItemsCollapsible: React.FC<ItemsCollapsibleProps> = ({
  title,
  id,
  edges,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { idOpen, setIdOpen } = useSideStore();

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={`text-[13px] flex items-center justify-between rounded ${
          idOpen === id
            ? "border border-violet-500 bg-violet-200 text-violet-800"
            : ""
        }`}
      >
        <div
          className="flex items-center gap-1 px-2 cursor-pointer  hover:text-violet-800"
          onClick={() => setIdOpen(id)}
        >
          <ChevronRight
            className={`ml-auto w-4 h-4 transition-transform duration-200 ${
              edges.length > 0 && isOpen ? "rotate-90" : ""
            }`}
          />
          <span>{title}</span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="my-1">
        {edges.map((eds) => (
          <button
            key={eds.id}
            onClick={() => setIdOpen(eds.id)}
            className={`rounded text-[13px] flex items-center gap-2 ml-6 mb-1 px-2 cursor-pointer hover:text-violet-800 ${
              idOpen === eds.id
                ? "border border-violet-500 bg-violet-200 text-violet-800"
                : ""
            }`}
          >
            <Spline className="w-3 h-3" />
            <span className="whitespace-nowrap">{eds.id}</span>
          </button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ItemsCollapsible;
