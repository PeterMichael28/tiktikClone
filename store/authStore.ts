import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import axios from 'axios';
import { base_url } from "@/app/layout";

const authStore = ( set: any ) => ( {
    userProfile: null,
    allUsers: null,

    addUser: ( user: any ) => set( { userProfile: user } ),
    
    removeUser: () => set({userProfile: null}),

    fetchAllUsers: async () => {
        const res = await axios.get(`${base_url}/api/users`)

        set({allUsers: res.data})
    },
})

const useAuthStore = create(
    persist( authStore, {
        name: 'auth'
    })
)

export default useAuthStore;