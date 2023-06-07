import { createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, addDoc, serverTimestamp, doc, updateDoc} from "firebase/firestore"
import {db} from "../../../firebase-config"
import { combineReducers } from "@reduxjs/toolkit";
import moment from "moment";

const getCarouselSlice = createSlice({
    name: 'getCarousel',
    initialState: {
        data: [],
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        getCarouselData(state, action){
            state.data = action.payload
        },
        getCarouselLoading(state, action){
            state.loading = action.payload
        },
        getCarouselSuccess(state, action){
            state.success = action.payload
        },
        getCarouselError(state, action){
            state.error = action.payload
        }
    }
})



const addCarouselSlice = createSlice({
    name: 'addCarousel',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        addCarouselLoading(state, action){
            state.loading = action.payload
        },
        addCarouselSuccess(state, action){
            state.success = action.payload
        },
        addCarouselError(state, action){
            state.error = action.payload
        },
        addCarouselReset(state){
            state.success = false
            state.error = ""
        }
    }
})

const editCarouselSlice = createSlice({
    name: 'editCarousel',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        editCarouselLoading(state, action){
            state.loading = action.payload
        },
        editCarouselSuccess(state, action){
            state.success = action.payload
        },
        editCarouselError(state, action){
            state.error = action.payload
        },
        editCarouselReset(state){
            state.success = false
            state.error = ""
        }
    }
})

export const {getCarouselData, getCarouselLoading, getCarouselSuccess, getCarouselError} = getCarouselSlice.actions;
export const {addCarouselLoading, addCarouselSuccess, addCarouselError, addCarouselReset} = addCarouselSlice.actions;
export const {editCarouselLoading, editCarouselSuccess, editCarouselError, editCarouselReset} = editCarouselSlice.actions;


export const carouselReducer = combineReducers({
    getCarousel: getCarouselSlice.reducer,
    addCarousel: addCarouselSlice.reducer,
    editCarousel: editCarouselSlice.reducer,
});


// thunks

export function fetchCarousel(){
    return async function fetchCarouselThunk(dispatch){
        dispatch(getCarouselLoading(true))
        try {
            let carousel = []
            const slides = await getDocs(
                query(collection(db, "carousel"))
            );
            slides.docs.forEach((doc) => {
                carousel.push({ ...doc.data(), id: doc.id})
            });
            dispatch(getCarouselData(carousel))
            dispatch(getCarouselLoading(false))
            dispatch(getCarouselSuccess(true))
        } catch(err) {
            dispatch(getCarouselError(err.message))
        }
    }
}

export function addNewCarousel(data){
    return async function addNewCarouselThunk(dispatch){
        dispatch(addCarouselLoading(true))
        try {
            await addDoc(collection(db, "carousel"), {
                caption: data.caption,
                imageUrl: data.imageUrl,
                is_active: data.is_active
            })
            dispatch(addCarouselLoading(false))
            dispatch(addCarouselSuccess(true))
        } catch(err) {
            dispatch(addCarouselError(err.message))
        }
    }
}

export function editCarousel(id, data){
    return async function editCarouselThunk(dispatch){
        dispatch(editCarouselLoading(true))
        try {
            const docRef = doc(db, "carousel", id)
            await updateDoc(docRef, {
                caption: data.caption,
                imageUrl: data.imageUrl,
                is_active: data.is_active
            })
            dispatch(editCarouselLoading(false))
            dispatch(editCarouselSuccess(true))
        } catch(err) {
            dispatch(editCarouselError(err.message))
        }
    }
}