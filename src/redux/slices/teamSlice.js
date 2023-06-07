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

const getAdvisors = createSlice({
    name: 'getAdvisors',
    initialState: {
        data: [],
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        setAdvisors(state, action){
            state.data = action.payload
        },
        setAdvisorsLoading(state, action){
            state.loading = action.payload
        },
        setAdvisorsSuccess(state, action){
            state.success = action.payload
        },
        setAdvisorsError(state, action){
            state.error = action.payload
        }
    }
})

const getMembers = createSlice({
    name: 'getMembers',
    initialState: {
        generalMembers: [],
        lifeMembers: [],
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        setGeneralMembers(state, action){
            state.generalMembers = action.payload
        },
        setLifeMembers(state, action){
            state.lifeMembers = action.payload
        },
        setMembersLoading(state, action){
            state.loading = action.payload
        },
        setMembersSuccess(state, action){
            state.success = action.payload
        },
        setMembersError(state, action){
            state.error = action.payload
        }
    }
})

export const { setBoardCommittee, setBoardCommitteeLoading, setBoardCommitteeSuccess, setBoardCommitteeError } = getBoardCommittee.actions;
export const { setOfficeStaffs, setOfficeStaffsLoading, setOfficeStaffsSuccess, setOfficeStaffsError } = getOfficeStaffs.actions;
export const { setAdvisors, setAdvisorsLoading, setAdvisorsSuccess, setAdvisorsError } = getAdvisors.actions;
export const { setGeneralMembers, setLifeMembers, setMembersLoading, setMembersSuccess, setMembersError } = getMembers.actions;

export const teamReducer = combineReducers({
    getBoardCommittee: getBoardCommittee.reducer,
    getOfficeStaffs: getOfficeStaffs.reducer,
    getAdvisors: getAdvisors.reducer,
    getMembers: getMembers.reducer,
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

export function fetchAdvisors(){
    return async function fetchAdvisorsThunk(dispatch, getState){
        dispatch(setAdvisorsLoading(true))
        try {
            let advisors = []
            const Members = await getDocs(
                query(collection(db, "members"),where('teamCategory', '==', 'Advisors'), orderBy('level', 'asc'))
            );
            Members.docs.forEach((doc) => {
                advisors.push({ ...doc.data(), id: doc.id})
            });
            dispatch(setAdvisors(advisors))
            dispatch(setAdvisorsLoading(false))
            dispatch(setAdvisorsSuccess(true)) 
        } catch(err) {
            dispatch(setAdvisorsLoading(false))
            dispatch(setAdvisorsError(err.message))
        }
    }
}

export function fetchMembers(){
    return async function fetchMembersThunk(dispatch, getState){
        dispatch(setMembersLoading(true))
        try {
            let gm = []
            let lm = []
            const [GMembers, LMembers] = await Promise.all([
                getDocs(
                    query(collection(db, "members"), where('teamCategory', '==', 'General Members'),)
                ),
                getDocs(
                    query(collection(db, "members"), where('teamCategory', '==', 'Life Members'),)
                )
            ])
            GMembers.docs.forEach((doc) => {
                gm.push({ ...doc.data(), id: doc.id})
            });
            dispatch(setGeneralMembers(gm))
            LMembers.docs.forEach((doc) => {
                lm.push({ ...doc.data(), id: doc.id})
            });
            dispatch(setLifeMembers(lm))
            dispatch(setMembersLoading(false))
            dispatch(setMembersSuccess(true)) 
        } catch(err) {
            dispatch(setMembersLoading(false))
            dispatch(setMembersError(err.message))
        }
    }
}