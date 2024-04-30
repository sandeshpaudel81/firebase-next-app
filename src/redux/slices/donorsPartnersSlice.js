import { combineReducers, createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, doc, getDoc, addDoc, deleteDoc, updateDoc} from "firebase/firestore"
import {db} from "../../../firebase-config"

const getDonorsPartners = createSlice({
    name: 'getDonorsPartners',
    initialState: {
        data: [],
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        setDonorsPartners(state, action){
            state.data = action.payload
        },
        setDonorsPartnersLoading(state, action){
            state.loading = action.payload
        },
        setDonorsPartnersSuccess(state, action){
            state.success = action.payload
        },
        setDonorsPartnersError(state, action){
            state.error = action.payload
        }
    }
})

const addDonorsPartnersSlice = createSlice({
    name: 'addDonorsPartners',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        addDonorsPartnersLoading(state, action){
            state.loading = action.payload
        },
        addDonorsPartnersSuccess(state, action){
            state.success = action.payload
        },
        addDonorsPartnersError(state, action){
            state.error = action.payload
        },
        addDonorsPartnersReset(state){
            state.loading = false
            state.success = false
            state.error = ""
        }
    }
})

const editDonorsPartnersSlice = createSlice({
    name: 'editDonorsPartners',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        editDonorsPartnersLoading(state, action){
            state.loading = action.payload
        },
        editDonorsPartnersSuccess(state, action){
            state.success = action.payload
        },
        editDonorsPartnersError(state, action){
            state.error = action.payload
        },
        editDonorsPartnersReset(state){
            state.success = false
            state.error = ""
        }
    }
})

const deleteDonorsPartnersSlice = createSlice({
    name: 'deleteDonorsPartners',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        deleteDonorsPartnersLoading(state, action){
            state.loading = action.payload
        },
        deleteDonorsPartnersSuccess(state, action){
            state.success = action.payload
        },
        deleteDonorsPartnersError(state, action){
            state.error = action.payload
        },
        deleteDonorsPartnersReset(state){
            state.success = false
            state.error = ""
        }
    }
})

export const { setDonorsPartners, setDonorsPartnersLoading, setDonorsPartnersSuccess, setDonorsPartnersError } = getDonorsPartners.actions;
export const { addDonorsPartnersLoading, addDonorsPartnersSuccess, addDonorsPartnersError, addDonorsPartnersReset} = addDonorsPartnersSlice.actions;
export const { editDonorsPartnersLoading, editDonorsPartnersSuccess, editDonorsPartnersError, editDonorsPartnersReset } = editDonorsPartnersSlice.actions;
export const { deleteDonorsPartnersLoading, deleteDonorsPartnersSuccess, deleteDonorsPartnersError, deleteDonorsPartnersReset } = deleteDonorsPartnersSlice.actions;

export const donorsPartnersReducer = combineReducers({
    getDonorsPartners: getDonorsPartners.reducer,
    addDonorsPartners: addDonorsPartnersSlice.reducer,
    editDonorsPartners: editDonorsPartnersSlice.reducer,
    deleteDonorsPartners: deleteDonorsPartnersSlice.reducer,
});

export function fetchDonorsPartners(){
    return async function fetchDonorsPartnersThunk(dispatch, getState){
        dispatch(setDonorsPartnersLoading(true))
        try {
            let donors = []
            const donorsPartners = await getDocs(
                query(collection(db, "donors-partners"))
            );
            donorsPartners.docs.forEach((doc) => {
                donors.push({ ...doc.data(), id: doc.id})
            });
            dispatch(setDonorsPartners(donors))
            dispatch(setDonorsPartnersLoading(false))
            dispatch(setDonorsPartnersSuccess(true)) 
        } catch(err) {
            dispatch(setDonorsPartnersLoading(false))
            dispatch(setDonorsPartnersError('Error while fetching data.'))
        }
    }
}

export function addDonorsPartners(data){
    return async function addDonorsPartnersThunk(dispatch){
        dispatch(addDonorsPartnersLoading(true))
        try {
            await addDoc(collection(db, "donors-partners"), data)
            dispatch(addDonorsPartnersLoading(false))
            dispatch(addDonorsPartnersSuccess(true))
        } catch(err) {
            dispatch(addDonorsPartnersError(err.message))
        }
    }
}

export function editDonorsPartners(id, data){
    return async function editDonorsPartnersThunk(dispatch){
        dispatch(editDonorsPartnersLoading(true))
        try {
            await updateDoc(doc(db, "donors-partners", id), data)
            dispatch(editDonorsPartnersLoading(false))
            dispatch(editDonorsPartnersSuccess(true))
        } catch(err) {
            dispatch(editDonorsPartnersError(err.message))
        }
    }
}

export function deleteDonorsPartners(id){
    return async function deleteDonorsPartnersThunk(dispatch){
        dispatch(deleteDonorsPartnersLoading(true))
        try {
            await deleteDoc(doc(db, "donors-partners", id))
            dispatch(deleteDonorsPartnersLoading(false))
            dispatch(deleteDonorsPartnersSuccess(true))
        } catch(err) {
            dispatch(deleteDonorsPartnersError(err.message))
        }
    }
}