import { combineReducers, createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, orderBy} from "firebase/firestore"
import {db} from "../../../firebase-config"
import moment from "moment";

const getPublications = createSlice({
    name: 'getPublications',
    initialState: {
        data: [],
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        setPublications(state, action){
            state.data = action.payload
        },
        setPublicationsLoading(state, action){
            state.loading = action.payload
        },
        setPublicationsSuccess(state, action){
            state.success = action.payload
        },
        setPublicationsError(state, action){
            state.error = action.payload
        }
    }
})

export const { setPublications, setPublicationsLoading, setPublicationsSuccess, setPublicationsError } = getPublications.actions;

export const publicationsReducer = combineReducers({
    getPublications: getPublications.reducer,
});

export function fetchPublications(){
    return async function fetchPublicationsThunk(dispatch, getState){
        dispatch(setPublicationsLoading(true))
        try {
            let publications = []
            const Publications = await getDocs(
                query(collection(db, "publications"))
            );
            Publications.docs.forEach((doc) => {
                publications.push({ ...doc.data(), id: doc.id})
            });
            dispatch(setPublications(publications))
            dispatch(setPublicationsLoading(false))
            dispatch(setPublicationsSuccess(true)) 
        } catch(err) {
            dispatch(setPublicationsLoading(false))
            dispatch(setPublicationsError(err.message))
        }
    }
}