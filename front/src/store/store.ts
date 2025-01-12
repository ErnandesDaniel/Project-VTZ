import { create } from 'zustand';
import apiInstance from "@/utils/apiInstance";

interface VTZStore {
    vtzTaskList:[];
    vtzGatewaysList: [];
    vtzDocumentationList: [];
    loadVTZTasks: any;
    loadVTZGateways: any;
    loadVTZDocumentation: any;
    authToken:string;
    deleteVTZ: any;
    getAuthToken:any;
    setFilteredVTZ:any;
    filteredVTZ:any[];
}

export const useVTZStore = create<VTZStore>()((set, get) => ({

    filteredVTZ:[],
    setFilteredVTZ:(newValue:any[])=>{
        set({filteredVTZ:newValue})
    },

    loadVTZTasks: async ()=>{
        const {vtzTaskList}=get();
        if(vtzTaskList.length===0){
            const response = await apiInstance.get(`/TaskVTZ/GetAll?withData=${true}`);
            set({vtzTaskList: response.data?.value.$values})
        }
    },

    loadVTZGateways: async ()=>{
        const {vtzGatewaysList}=get();
        if(vtzGatewaysList.length===0){
            const response = await apiInstance.get(`/Gateways`);
            //console.log(response);
            set({vtzGatewaysList: response.data?.value.$values})
        }
    },

    loadVTZDocumentation: async ()=>{
        const {vtzDocumentationList}=get();
        if(vtzDocumentationList.length===0){
            const response = await apiInstance.get(`/Section`);
            console.log(response);
            set({vtzDocumentationList: response.data?.value})
        }
    },

    authToken:'',

    getAuthToken: async()=>{
        apiInstance.post(`/Auth/login`, {
            username: "johndoe", password: "password_hash_1"
        }).then((res)=>{
            set({authToken: res.data.token});
        });
    },

    vtzDocumentationList:[],
    vtzGatewaysList:[],
    vtzTaskList: [],

    deleteVTZ: async (deleteVTZId:any) => {
        const {authToken}=get();
        console.log('Улаление ВТЗ');
        console.log(authToken);
        apiInstance.delete(`/TaskVTZ/Delete`, {
            headers: {
                Authorization: authToken
            },
            params: { taskId: deleteVTZId },

        }).then((res)=>{console.log(res)});


    //set(state => ({ vtzList: state.vtzList.filter(({ key }) => key !== deleteVTZId) }))

    },
}));
