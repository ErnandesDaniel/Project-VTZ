import {Dispatch} from 'react';
import { create } from 'zustand';

interface SideFiltersStore {
    checkedInstitutes:string[];
    setCheckedInstitutes: Dispatch<string[]>;

    checkedInstitutesOrAnd:'or'|'and';
    setCheckedInstitutesOrAnd: Dispatch<'or'|'and'>;

    checkedDocumentationType:string[];
    setCheckedDocumentationType: Dispatch<string[]>;

    checkedDocumentationTypeOrAnd:'or'|'and';
    setCheckedDocumentationTypeOrAnd: Dispatch<'or'|'and'>;

    checkedDocumentation:string[];
    setCheckedDocumentation: Dispatch<string[]>;

    checkedDocumentationOrAnd:'or'|'and';
    setCheckedDocumentationOrAnd: Dispatch<'or'|'and'>;

    checkedVTZ:string[];
    setCheckedVTZ: Dispatch<string[]>;

}

export const useSideFiltersStore = create<SideFiltersStore>()((set, get) => ({

    checkedInstitutes:[],
    setCheckedInstitutes:(value:string[])=>{
        set({checkedInstitutes: value});
    },

    checkedInstitutesOrAnd:'or',
    setCheckedInstitutesOrAnd:(value:'or'|'and')=>{
        set({checkedInstitutesOrAnd: value});
    },

    checkedDocumentationType:[],
    setCheckedDocumentationType:(value:string[])=>{
        set({checkedDocumentationType: value});
    },

    checkedDocumentationTypeOrAnd:'or',
    setCheckedDocumentationTypeOrAnd:(value:'or'|'and')=>{
        set({checkedDocumentationTypeOrAnd: value});
    },

    checkedDocumentation:[],
    setCheckedDocumentation:(value:string[])=>{
        set({checkedDocumentation: value});
    },

    checkedDocumentationOrAnd:'or',
    setCheckedDocumentationOrAnd:(value:'or'|'and')=>{
        set({checkedDocumentationOrAnd: value});
    },

    checkedVTZ:[],
    setCheckedVTZ:(value:string[])=>{
        set({checkedVTZ: value});
    },
}));
