import { combineReducers, createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, doc, getDoc} from "firebase/firestore"
import {db} from "../../../firebase-config"

const getProjectSlice = createSlice({
    name: 'getProject',
    initialState: {
        data: [],
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        setProjects(state, action){
            state.data = action.payload
        },
        setLoading(state, action){
            state.loading = action.payload
        },
        setSuccess(state, action){
            state.success = action.payload
        },
        setError(state, action){
            state.error = action.payload
        }
    }
})


const addProjectSlice = createSlice({
    name: 'addProject',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        addProjectLoading(state, action){
            state.loading = action.payload
        },
        addProjectSuccess(state, action){
            state.success = action.payload
        },
        addProjectError(state, action){
            state.error = action.payload
        },
        addProjectReset(state){
            state.success = false
            state.error = ""
        }
    }
})

export const { setProjects, setLoading, setSuccess, setError } = getProjectSlice.actions;
export const { addProjectLoading, addProjectSuccess, addProjectError, addProjectReset } = addProjectSlice.actions;

export const projectReducer = combineReducers({
    getProject: getProjectSlice.reducer,
    addProject: addProjectSlice.reducer,
});

// thunks
export function fetchProjects(){
    return async function fetchProjectsThunk(dispatch, getState){
        dispatch(setLoading(true))
        try {
            let projectList = []
            const projects = await getDocs(
                query(collection(db, "projects"))
            );
            projects.docs.forEach((doc) => {
                projectList.push({ ...doc.data(), id: doc.id})
            });
            dispatch(setProjects(projectList))
            dispatch(setLoading(false))
            dispatch(setSuccess(true)) 
        } catch(err) {
            dispatch(setLoading(false))
            dispatch(setError('Error while fetching projects.'))
        }
    }
}
