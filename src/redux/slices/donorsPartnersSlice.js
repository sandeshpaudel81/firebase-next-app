import { combineReducers, createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, doc, getDoc} from "firebase/firestore"
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

export const { setDonorsPartners, setDonorsPartnersLoading, setDonorsPartnersSuccess, setDonorsPartnersError } = getDonorsPartners.actions;

export const donorsPartnersReducer = combineReducers({
    getDonorsPartners: getDonorsPartners.reducer,
    
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