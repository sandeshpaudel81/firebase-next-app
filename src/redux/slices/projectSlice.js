import { combineReducers, createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, doc, getDoc, addDoc, updateDoc, deleteDoc} from "firebase/firestore"
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

const editProjectSlice = createSlice({
    name: 'editProject',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        editProjectLoading(state, action){
            state.loading = action.payload
        },
        editProjectSuccess(state, action){
            state.success = action.payload
        },
        editProjectError(state, action){
            state.error = action.payload
        },
        editProjectReset(state){
            state.success = false
            state.error = ""
        }
    }
})

const deleteProjectSlice = createSlice({
    name: 'deleteProject',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        deleteProjectLoading(state, action){
            state.loading = action.payload
        },
        deleteProjectSuccess(state, action){
            state.success = action.payload
        },
        deleteProjectError(state, action){
            state.error = action.payload
        },
        deleteProjectReset(state){
            state.success = false
            state.error = ""
        }
    }
})

export const { setProjects, setLoading, setSuccess, setError } = getProjectSlice.actions;
export const { addProjectLoading, addProjectSuccess, addProjectError, addProjectReset } = addProjectSlice.actions;
export const { editProjectLoading, editProjectSuccess, editProjectError, editProjectReset } = editProjectSlice.actions;
export const { deleteProjectLoading, deleteProjectSuccess, deleteProjectError, deleteProjectReset } = deleteProjectSlice.actions;

export const projectReducer = combineReducers({
    getProject: getProjectSlice.reducer,
    addProject: addProjectSlice.reducer,
    editProject: editProjectSlice.reducer,
    deleteProject: deleteProjectSlice.reducer,
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

export function addProject(data){
    return async function addProjectThunk(dispatch){
        dispatch(addProjectLoading(true))
        try {
            await addDoc(collection(db, "projects"), data)
            dispatch(addProjectLoading(false))
            dispatch(addProjectSuccess(true))
        } catch(err) {
            dispatch(addProjectError(err.message))
        }
    }
}

export function editProject(id, data){
    return async function editProjectThunk(dispatch){
        dispatch(editProjectLoading(true))
        try {
            await updateDoc(doc(db, "projects", id), data)
            dispatch(editProjectLoading(false))
            dispatch(editProjectSuccess(true))
        } catch(err) {
            dispatch(editProjectError(err.message))
        }
    }
}

export function deleteProject(id){
    return async function deleteProjectThunk(dispatch){
        dispatch(deleteProjectLoading(true))
        try {
            await deleteDoc(doc(db, "projects", id))
            dispatch(deleteProjectLoading(false))
            dispatch(deleteProjectSuccess(true))
        } catch(err) {
            dispatch(deleteProjectError(err.message))
        }
    }
}