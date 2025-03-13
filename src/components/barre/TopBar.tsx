import DateTimeHeader from "@/components/utils/DateTimeHeader";
import TooltipUtils from "@/components/utils/TooltipUtils";
import useSideStore from "@/store/sideStore";
import useStoreFlow from "@/store/storeFlow";
import {
  ChevronDown,
  ChevronRight,
  Diameter,
  Maximize,
  Minimize,
  Play,
  Radius,
  SidebarClose,
  SidebarOpen,
  TableRowsSplitIcon,
} from "lucide-react";
import Dropdown, { DropdownItems } from "../utils/Dropdown";
import { useState } from "react";
import { bellmanFord } from "@/scripts/AlgorithmeFord";

const TopBar = () => {
  const { nodes, edges, updateNode } = useStoreFlow();
  const { sideOpen, setSideOpen, logOpen, setLogOpen , setResTable} = useSideStore();
  const [typeAlgo, setTypeAlgo] = useState("");

  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const findNodeExists = (typeNode: string) => {
    const exists = nodes.some((node) => node.type === typeNode);
    return exists;
  };

  const handleMinimum = (e: any) => {
    e.preventDefault();
    const resMini = bellmanFord(nodes, edges, "1");
    for (let i = 1; i <= nodes.length; i++) {
      const lamdda = resMini.lambda
      updateNode(i.toString(), { lambda: lamdda[i] });
    }
    setResTable(resMini.results)
  };

  return (
    <div className="flex items-center justify-between px-10 p-2 h-[60px]  bg-white border-b">
      <div className="flex flex-col justify-center">
        <span className="text-xs text-gray-500 flex items-center">
          <ChevronRight size={14} /> Recherche des chemin optimale
        </span>
        <span className="font-black text-violet-800">
          Algorithme de BELLIMAN-FORD
        </span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <TooltipUtils text="Noeud">
            <button
              className="p-2 border flex items-center gap-2  cursor-pointer  rounded  bg-gray-200 text-gray-600 hover:bg-violet-200 hover:text-violet-500 "
              draggable
              onDragStart={(event) => onDragStart(event, "custom")}
            >
              <Diameter size={16} />
            </button>
          </TooltipUtils>

          <TooltipUtils text="Point d'entrées">
            <button
              disabled={findNodeExists("entrer")}
              className={`p-2 border flex items-center gap-2 rounded bg-gray-200 text-gray-600 hover:bg-violet-200 hover:text-violet-500 ${
                findNodeExists("entrer")
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              draggable={!findNodeExists("entrer")}
              onDragStart={(event) => onDragStart(event, "entrer")}
            >
              <Radius size={16} />
            </button>
          </TooltipUtils>

          <TooltipUtils text="Points de sortie">
            <button
              disabled={findNodeExists("sortie")}
              className={`p-2 border flex items-center gap-2 rounded bg-gray-200 text-gray-600 hover:bg-violet-200 hover:text-violet-500 ${
                findNodeExists("sortie")
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              draggable={!findNodeExists("sortie")}
              onDragStart={(event) => onDragStart(event, "sortie")}
            >
              <Radius size={16} className="rotate-180" />
            </button>
          </TooltipUtils>
        </div>
        {/* Choix de l'algorithme */}
        <div className="flex items-center gap-10">
          <div className="flex">
            <TooltipUtils text="Executer l'algorithme">
              <button
                onClick={handleMinimum}
                className="px-4  py-1 flex items-center gap-1  cursor-pointer  rounded-l  bg-violet-500 text-white hover:bg-violet-500/90 "
              >
                <Play size={16} /> {typeAlgo ? typeAlgo : "Executer"}
              </button>
            </TooltipUtils>
            <Dropdown
              btnShow={
                <span className="p-2 border flex items-center gap-2  cursor-pointer  rounded-r  bg-gray-200 text-gray-600 hover:bg-violet-200 hover:text-violet-500 ">
                  <ChevronDown size={16} />
                </span>
              }
            >
              <DropdownItems
                icon={<Minimize size={12} />}
                onClick={() => setTypeAlgo("Minimisation")}
                title="Minimisation"
              />
              <DropdownItems
                icon={<Maximize size={12} />}
                onClick={() => setTypeAlgo("Maximisation")}
                title="Maximisation"
              />
            </Dropdown>
          </div>

          <TooltipUtils text="Affichage">
            <button
              onClick={() => setLogOpen(!logOpen)}
              className="p-2 border flex items-center gap-2  cursor-pointer  rounded  bg-gray-200 text-gray-600 hover:bg-violet-200 hover:text-violet-500 "
            >
              <TableRowsSplitIcon size={16} />
            </button>
          </TooltipUtils>

          <TooltipUtils text="Fermer le sidebar">
            <button
              onClick={() => setSideOpen(!sideOpen)}
              className="p-2 border flex items-center gap-2  cursor-pointer  rounded bg-gray-200 text-gray-600 hover:bg-violet-200 hover:text-violet-500 "
            >
              {sideOpen ? (
                <SidebarOpen size={16} />
              ) : (
                <SidebarClose size={16} />
              )}
            </button>
          </TooltipUtils>

          <DateTimeHeader />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
