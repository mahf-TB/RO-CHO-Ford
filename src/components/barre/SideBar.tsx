import useStoreFlow from "@/store/storeFlow";
import ItemsCollapsible from "../utils/ItemsCollapsible";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { useState } from "react";
import useSideStore from "@/store/sideStore";

const SideBar = () => {
  const [dataUpdate, setDataUpdate] = useState();
  const { nodeEdges, getOneNodeOrEdges } = useStoreFlow();
  const { idOpen } = useSideStore();
  const nodesWithEdges = nodeEdges();

  const data = getOneNodeOrEdges(idOpen);
  console.log(data);
  return (
    <div className="border-l h-screen bg-violet-50/50   overflow-y-scroll  ">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={80}>
          <div className="space-y-2 p-2 overscroll-y-auto mb-16 h-full">
            {nodesWithEdges.map((node) => (
              <div key={node.id}>
                <ItemsCollapsible
                  title={`Noeud X${node.id}`}
                  id={node.id}
                  edges={node.edges}
                />
              </div>
            ))}
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={20} maxSize={40}>
          <div className="h-[56px]"></div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default SideBar;
