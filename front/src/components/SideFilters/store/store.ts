import {Dispatch} from 'react';
import { create } from 'zustand';

interface SideFiltersStore {
    checkedInstitutes:string[];
    setCheckedInstitutes: Dispatch<string[]>;

    checkedDocumentation:string[];
    setCheckedDocumentation: Dispatch<string[]>;





}

export const useSideFiltersStore = create<SideFiltersStore>()((set, get) => ({

    checkedInstitutes:[],
    setCheckedInstitutes:(value:string[])=>{
        set({checkedInstitutes: value});
    },



    checkedDocumentation:[],
    setCheckedDocumentation:(value:string[])=>{
        set({checkedDocumentation: value});
    },






}));
