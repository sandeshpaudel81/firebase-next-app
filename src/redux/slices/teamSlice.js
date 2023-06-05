import { combineReducers, createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, orderBy, where} from "firebase/firestore"
import {db} from "../../../firebase-config"

const getBoardCommittee = createSlice({
    name: 'getBoardCommittee',
    initialState: {
        data: [],
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        setBoardCommittee(state, action){
            state.data = action.payload
        },
        setBoardCommitteeLoading(state, action){
            state.loading = action.payload
        },
        setBoardCommitteeSuccess(state, action){
            state.success = action.payload
        },
        setBoardCommitteeError(state, action){
            state.error = action.payload
        }
    }
})

export const { setBoardCommittee, setBoardCommitteeLoading, setBoardCommitteeSuccess, setBoardCommitteeError } = getBoardCommittee.actions;

export const teamReducer = combineReducers({
    getBoardCommittee: getBoardCommittee.reducer,
    
});

export function fetchBoardCommittee(){
    return async function fetchBoardCommitteeThunk(dispatch, getState){
        dispatch(setBoardCommitteeLoading(true))
        try {
            let members = []
            const Members = await getDocs(
                query(collection(db, "members"),where('teamCategory', '==', 'Board Committee'), orderBy('level', 'asc'))
            );
            Members.docs.forEach((doc) => {
                members.push({ ...doc.data(), id: doc.id})
            });
            dispatch(setBoardCommittee(members))
            dispatch(setBoardCommitteeLoading(false))
            dispatch(setBoardCommitteeSuccess(true)) 
        } catch(err) {
            dispatch(setBoardCommitteeLoading(false))
            dispatch(setBoardCommitteeError(err.message))
        }
    }
}