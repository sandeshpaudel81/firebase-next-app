import { combineReducers, createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, doc, getDoc} from "firebase/firestore"
import {db} from "../../../firebase-config"
import moment from "moment";

const getNotices = createSlice({
    name: 'getNotices',
    initialState: {
        data: [],
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        setNotices(state, action){
            state.data = action.payload
        },
        setNoticesLoading(state, action){
            state.loading = action.payload
        },
        setNoticesSuccess(state, action){
            state.success = action.payload
        },
        setNoticesError(state, action){
            state.error = action.payload
        }
    }
})

export const { setNotices, setNoticesLoading, setNoticesSuccess, setNoticesError } = getNotices.actions;

export const noticesReducer = combineReducers({
    getNotices: getNotices.reducer,
    
});

// convert timestamp to date

export function timestampToDate(datetime){
    return String(moment(datetime.toDate()).format("dddd, MMMM Do YYYY"))
}

export function fetchNotices(){
    return async function fetchNoticesThunk(dispatch, getState){
        dispatch(setNoticesLoading(true))
        try {
            let notices = []
            const Notices = await getDocs(
                query(collection(db, "notices"))
            );
            Notices.docs.forEach((doc) => {
                const datetime = timestampToDate(doc.data().posted_at)
                notices.push({ ...doc.data(), id: doc.id, posted_at: datetime})
            });
            dispatch(setNotices(notices))
            dispatch(setNoticesLoading(false))
            dispatch(setNoticesSuccess(true)) 
        } catch(err) {
            dispatch(setNoticesLoading(false))
            dispatch(setNoticesError('Error while fetching notices.'))
        }
    }
}