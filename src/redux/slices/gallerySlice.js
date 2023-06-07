import { combineReducers, createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, doc, getDoc, orderBy} from "firebase/firestore"
import {db} from "../../../firebase-config"
import moment from "moment";

const getGallery = createSlice({
    name: 'getGallery',
    initialState: {
        data: [],
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        setGallery(state, action){
            state.data = action.payload
        },
        setGalleryLoading(state, action){
            state.loading = action.payload
        },
        setGallerySuccess(state, action){
            state.success = action.payload
        },
        setGalleryError(state, action){
            state.error = action.payload
        }
    }
})

export const { setGallery, setGalleryLoading, setGallerySuccess, setGalleryError } = getGallery.actions;

export const galleryReducer = combineReducers({
    getGallery: getGallery.reducer,
    
});


export function fetchGallery(){
    return async function fetchGalleryThunk(dispatch, getState){
        dispatch(setGalleryLoading(true))
        try {
            let albums = []
            const Gallery = await getDocs(
                query(collection(db, "gallery"))
            );
            Gallery.docs.forEach((doc) => {
                albums.push({ ...doc.data(), id: doc.id})
            });
            dispatch(setGallery(albums))
            dispatch(setGalleryLoading(false))
            dispatch(setGallerySuccess(true)) 
        } catch(err) {
            dispatch(setGalleryLoading(false))
            dispatch(setGalleryError('Error while fetching gallery.'))
        }
    }
}