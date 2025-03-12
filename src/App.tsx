import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import TobBar from "./components/barre/TopBar";
import Graph from "./graph/Graph";
import SideBar from "./components/barre/SideBar";
import useSideStore from "./store/sideStore";
import TableMin from "./components/barre/TableMin";
import { X } from "lucide-react";

export default function App() {
  const { sideOpen, logOpen, setLogOpen } = useSideStore();
  return (
    <ReactFlowProvider>
      <AnimatePresence>
        <div className="h-full overflow-hidden">
          {/* top bar */}
          <TobBar />
          {/* Groupe  Resizable Parents */}
          <ResizablePanelGroup direction="horizontal">
            {/* Parents Panel 1 */}
            <ResizablePanel defaultSize={85}>
              {/* Groupe  Resizable Fils */}
              <ResizablePanelGroup direction="vertical">
                {/* Fils Panel 1 */}
                <ResizablePanel defaultSize={logOpen ? 100 : 80}>
                  <div className={logOpen ? "h-full" : "h-[calc(100%-55px)]"}>
                    <Graph />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle className="bg-violet-400 " />

                {/* Fils Panel 2 */}
               
                {logOpen && (
                  <ResizablePanel defaultSize={30 } minSize={30} >
                    <div className="h-5 bg-violet-200 border-b border-violet-400 flex items-center justify-between px-5">
                      <span className="text-xs uppercase text-violet-600 font-semibold">Calcul pour trouver le chemin</span>
                      <button
                        onClick={() => setLogOpen(false)}
                        className="flex items-center justify-center gap-2 text-xs cursor-pointer hover:bg-gray-100 rounded"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="bg-violet-50 ">
                      <TableMin />
                    </div>
                  </ResizablePanel>
                )}
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle  className="bg-violet-400" />
            {/* Parents Panel 2 */}
            {/* {sideOpen && ( */}
            <motion.div
              initial={{ width: 0, opacity: 0, x: -20 }} // Décalage vers la gauche
              animate={
                sideOpen
                  ? { width: "15%", opacity: 1, x: 0 }
                  : { width: 0, opacity: 0, x: -50 }
              }
              exit={{ width: 0, opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="h-full w-full"
            >
              <ResizablePanel defaultSize={15} maxSize={15} minSize={10}>
                <SideBar />
              </ResizablePanel>
            </motion.div>
            {/* )} */}
          </ResizablePanelGroup>
        </div>
      </AnimatePresence>
    </ReactFlowProvider>
  );
}
