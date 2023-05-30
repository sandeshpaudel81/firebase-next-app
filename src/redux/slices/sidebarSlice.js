import { createSlice } from "@reduxjs/toolkit";


const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        sidebar: false
    },
    reducers: {
        sidebarToggle(state, action){
            state.sidebar = action.payload
        }
    }
})

export const { sidebarToggle } = sidebarSlice.actions

export const sidebarReducer = sidebarSlice.reducer

// thunks
export function toggleSidebar(data){
    return function toggleSidebarThunk(dispatch, getState){
        dispatch(sidebarToggle(data))
    }
}
