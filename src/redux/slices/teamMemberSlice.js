import { combineReducers, createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, orderBy, where} from "firebase/firestore"
import {db} from "../../../firebase-config"

const getTeamMembersSlice = createSlice({
    name: 'getTeamMembers',
    initialState: {
        data: [],
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        setTeamMembers(state, action){
            state.data = action.payload
        },
        setTeamMembersLoading(state, action){
            state.loading = action.payload
        },
        setTeamMembersSuccess(state, action){
            state.success = action.payload
        },
        setTeamMembersError(state, action){
            state.error = action.payload
        }
    }
})

export const { setTeamMembers, setTeamMembersLoading, setTeamMembersSuccess, setTeamMembersError } = getTeamMembersSlice.actions;

export const teamMembersReducer = combineReducers({
    getTeamMembers: getTeamMembersSlice.reducer
});

export function fetchTeamMembers(){
    return async function fetchTeamMembersThunk(dispatch, getState){
        dispatch(setTeamMembersLoading(true))
        try {
            let members = []
            const Members = await getDocs(
                query(collection(db, "teams"))
            );
            Members.docs.forEach((doc) => {
                members.push({ ...doc.data(), id: doc.id})
            });
            dispatch(setTeamMembers(members))
            dispatch(setTeamMembersLoading(false))
            dispatch(setTeamMembersSuccess(true)) 
        } catch(err) {
            dispatch(setTeamMembersLoading(false))
            dispatch(setTeamMembersError(err.message))
        }
    }
}