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

export default function App() {
  const { sideOpen } = useSideStore();
  return (
    <ReactFlowProvider >
      <AnimatePresence>
        <div className="h-full overflow-hidden">
          {/* top bar */}
          <TobBar />
          {/* Groupe  Resizable Parents */}
          <ResizablePanelGroup direction="horizontal">
            {/* Parents Panel 1 */}
            <ResizablePanel defaultSize={80}>
              {/* Groupe  Resizable Fils */}
              <ResizablePanelGroup direction="vertical">
                {/* Fils Panel 1 */}
                <ResizablePanel defaultSize={80}>
                    <Graph />
                </ResizablePanel>

                <ResizableHandle withHandle />
                {/* Fils Panel 2 */}
                <ResizablePanel defaultSize={20} minSize={30} className="bg-black/70">
                  <div className="mt-1 bg-violet-50 ">
                    <TableMin />
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
