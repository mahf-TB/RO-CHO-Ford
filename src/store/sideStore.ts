import {  SideStoreState } from "@/types/type";
import { create } from "zustand";

const useSideStore = create <SideStoreState> ((set) => ({
    idOpen: "",
    sideOpen:true,
    logOpen:false,
    resTable: [],
    setResTable: (resTable) =>{
        set({ resTable });
      },
    setIdOpen: (idOpen: string) => {
        set({ idOpen });
    },
    setSideOpen: (sideOpen: boolean) => {
        set({ sideOpen });
    },
    setLogOpen: (logOpen: boolean) => {
        set({ logOpen });
    },
    
}))

export default useSideStore