import {Dispatch} from 'react';

import { create } from 'zustand';
import apiInstance from "@/utils/apiInstance";

interface VTZSchemaStore {
    selectedEdgeId?:string;
    setSelectedEdgeId: Dispatch<string| undefined>;
}

export const useVTZSchemaStore = create<VTZSchemaStore>()((set, get) => ({
    selectedEdgeId:undefined,
    setSelectedEdgeId:(newEdgeId?:string)=>{
        set({selectedEdgeId: newEdgeId});
    },
}));
