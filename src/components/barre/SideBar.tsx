import useStoreFlow from "@/store/storeFlow";
import ItemsCollapsible from "../utils/ItemsCollapsible";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { useEffect, useState } from "react";
import useSideStore from "@/store/sideStore";
import { Minus, Plus } from "lucide-react";

const SideBar = () => {
  const { idOpen } = useSideStore();
  const [dataUpdate, setDataUpdate] = useState({ label: "", id: "", type: "" });
  const { nodeEdges, getOneNodeOrEdges, updateNode, updateEdge } =
    useStoreFlow();
  const nodesWithEdges = nodeEdges();
  const data = getOneNodeOrEdges(idOpen);

  // ⚡ Mettre à jour `dataUpdate` quand `idOpen` change
  useEffect(() => {
    if (data) {
      setDataUpdate({
        label: data.type === "floating" ? data.label : data?.data?.label || "",
        id: data.id,
        type: data.type,
      });
    }
  }, [idOpen, data]);

  const handleSave = () => {
    if (dataUpdate.type === "floating") {
      updateEdge(data.id, { label: dataUpdate.label });
    } else {
      updateNode(data.id, { label: dataUpdate.label });
    }
  };

  // Fonction pour détecter la touche Entrée
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
      console.log(dataUpdate);
    }
  };

  const handleBlur = () => {
    handleSave();
    console.log(dataUpdate);
  };

  return (
    <div className="border-l h-screen bg-violet-50 border-violet-400">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={50}>
          <div className="space-y-2 p-2 overflow-y-scroll  mb-16 h-screen">
            {nodesWithEdges.map((node , i) => (
              <div key={i}>
                <ItemsCollapsible
                  title={`${node.data.label}`}
                  id={node.id}
                  edges={node.edges}
                />
              </div>
            ))}
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle className="bg-violet-400 " />

        <ResizablePanel defaultSize={50}>
          <div className="h-full p-2 my-4">
            <div>
              {data?.type === "floating" ? (
                <>
                  {/*  valeur de l'arc */}
                  <div>
                    <label className="block mb-1 text-xs uppercase text-slate-800">
                      Valeur de l'arc
                    </label>
                    <div className="relative">
                      <button
                        className="absolute h-7 w-7 right-10 top-0.5 my-auto px-2 flex items-center bg-violet-200  rounded hover:bg-slate-200"
                        type="button"
                      >
                        <Minus />
                      </button>

                      <input
                        type="number"
                        className="w-full pl-4 h-8 pr-3 py-1 bg-white placeholder:text-slate-300 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease "
                        placeholder="55"
                        value={dataUpdate?.label}
                        onChange={(e) =>
                          setDataUpdate((prev) => ({
                            ...prev,
                            label: e.target.value,
                          }))
                        }
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                      />

                      <button
                        className="absolute h-7 w-7 right-1 top-0.5 my-auto px-2 flex items-center bg-violet-200 rounded hover:bg-slate-200"
                        type="button"
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Noeud des valeur */}
                  <div className="space-y-2">
                    <div>
                      <label className="block mb-1  text-xs uppercase text-slate-800">
                        Nom du noeud
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full pl-4 h-8 pr-3 py-1 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease "
                          placeholder="Node X1"
                          value={dataUpdate?.label}
                          onChange={(e) =>
                            setDataUpdate((prev) => ({
                              ...prev,
                              label: e.target.value,
                            }))
                          }
                          onKeyDown={handleKeyDown}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-1  text-xs uppercase text-slate-800">
                        Numéro
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full pl-4 h-8 pr-3 py-1 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease "
                          placeholder="Node X1"
                          value={dataUpdate?.id}
                          onChange={(e) =>
                            setDataUpdate((prev) => ({
                              ...prev,
                              id: e.target.value,
                            }))
                          }
                          onKeyDown={handleKeyDown}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div></div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SideBar;
