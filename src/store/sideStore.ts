import {  SideStoreState } from "@/type";
import { create } from "zustand";

const useSideStore = create <SideStoreState> ((set) => ({
    idOpen: "",
    sideOpen:true,
    setIdOpen: (idOpen: string) => {
        set({ idOpen });
    },
    setSideOpen: (sideOpen: boolean) => {
        set({ sideOpen });
    },
}))

export default useSideStore