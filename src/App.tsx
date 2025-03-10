import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Sidebar from "./components/barre/TopBar";
import Graph from "./graph/Graph";
import SideBar from "./components/barre/SideBar";
import useSideStore from "./store/sideStore";

export default function App() {
  const { sideOpen } = useSideStore();
  return (
    <ReactFlowProvider>
      <AnimatePresence>
        <div className="h-screen overflow-hidden">
          <Sidebar />
          {/* Groupe  Resizable Parents */}
          <ResizablePanelGroup direction="horizontal">
            {/* Parents Panel 1 */}
            <ResizablePanel defaultSize={80}>
              {/* Groupe  Resizable Fils */}
              <ResizablePanelGroup direction="vertical">
                {/* Fils Panel 1 */}
                <ResizablePanel defaultSize={80}>
                  <div className="h-full w-full overflow-hidden">
                    <Graph />
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />
                {/* Fils Panel 2 */}
                <ResizablePanel defaultSize={20}>
                  <div className="flex h-full items-center justify-center bg-violet-500/30">
                    <span className="font-semibold">Three</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
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
