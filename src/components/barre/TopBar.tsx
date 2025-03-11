import DateTimeHeader from "@/components/utils/DateTimeHeader";
import TooltipUtils from "@/components/utils/TooltipUtils";
import useSideStore from "@/store/sideStore";
import useStoreFlow from "@/store/storeFlow";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  ChevronRight,
  Diameter,
  Ellipsis,
  Play,
  Radius,
} from "lucide-react";

const TopBar = () => {
  const { nodes, edges } = useStoreFlow();
  const { sideOpen, setSideOpen } = useSideStore();
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
    console.log("Nodes : ", nodes);
    console.log("Edges : ", edges);
    const valueLab = nodes.map((item) => {
      const edsValues = edges.filter((eds) => eds.source === item.id);
      return {
        ...item,
        edsValues,
      };
    });
    console.log(valueLab);
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
              className={`p-2 border flex items-center gap-2 rounded bg-gray-200 text-gray-600 hover:bg-violet-200 hover:text-violet-500 ${findNodeExists("entrer") ? "cursor-not-allowed" : "cursor-pointer"}`}
              draggable={!findNodeExists("entrer")}
              onDragStart={(event) => onDragStart(event, "entrer")}
            >
              <Radius size={16} />
            </button>
          </TooltipUtils>

          <TooltipUtils text="Points de sortie">
            <button
              disabled={findNodeExists("sortie")}
              className={`p-2 border flex items-center gap-2 rounded bg-gray-200 text-gray-600 hover:bg-violet-200 hover:text-violet-500 ${findNodeExists("sortie") ? "cursor-not-allowed" : "cursor-pointer"}`}
              draggable={!findNodeExists("sortie")}
              onDragStart={(event) => onDragStart(event, "sortie")}
            >
              <Radius size={16} className="rotate-180" />
            </button>
          </TooltipUtils>
        </div>
        {/* Choix de l'algorithme */}
        <div className="flex items-center gap-10">
          <TooltipUtils text="Executer l'algorithme">
            <div className="flex">
              <button
                onClick={handleMinimum}
                className="px-4  py-1 flex items-center gap-1  cursor-pointer  rounded-l  bg-violet-500 text-white hover:bg-violet-500/90 "
              >
                <Play size={16} /> Executer
              </button>
              <button className="p-2 border flex items-center gap-2  cursor-pointer  rounded-r  bg-gray-200 text-gray-600 hover:bg-violet-200 hover:text-violet-500 ">
                <Ellipsis size={16} />
              </button>
            </div>
          </TooltipUtils>

          <TooltipUtils text="Fermer le sidebar">
            <button
              onClick={() => setSideOpen(!sideOpen)}
              className="p-2 border flex items-center gap-2  cursor-pointer  rounded bg-gray-200 text-gray-600 hover:bg-violet-200 hover:text-violet-500 "
            >
              {sideOpen ? (
                <ArrowRightFromLine size={16} />
              ) : (
                <ArrowLeftFromLine size={16} />
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
