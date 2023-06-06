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

const getOfficeStaffs = createSlice({
    name: 'getOfficeStaffs',
    initialState: {
        data: [],
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        setOfficeStaffs(state, action){
            state.data = action.payload
        },
        setOfficeStaffsLoading(state, action){
            state.loading = action.payload
        },
        setOfficeStaffsSuccess(state, action){
            state.success = action.payload
        },
        setOfficeStaffsError(state, action){
            state.error = action.payload
        }
    }
})

export const { setBoardCommittee, setBoardCommitteeLoading, setBoardCommitteeSuccess, setBoardCommitteeError } = getBoardCommittee.actions;
export const { setOfficeStaffs, setOfficeStaffsLoading, setOfficeStaffsSuccess, setOfficeStaffsError } = getOfficeStaffs.actions;

export const teamReducer = combineReducers({
    getBoardCommittee: getBoardCommittee.reducer,
    getOfficeStaffs: getOfficeStaffs.reducer,
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

export function fetchOfficeStaffs(){
    return async function fetchOfficeStaffsThunk(dispatch, getState){
        dispatch(setOfficeStaffsLoading(true))
        try {
            let staffs = []
            const Members = await getDocs(
                query(collection(db, "members"),where('teamCategory', '==', 'Office Staffs'), orderBy('level', 'asc'))
            );
            Members.docs.forEach((doc) => {
                staffs.push({ ...doc.data(), id: doc.id})
            });
            dispatch(setOfficeStaffs(staffs))
            dispatch(setOfficeStaffsLoading(false))
            dispatch(setOfficeStaffsSuccess(true)) 
        } catch(err) {
            dispatch(setOfficeStaffsLoading(false))
            dispatch(setOfficeStaffsError(err.message))
        }
    }
}