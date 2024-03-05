import { combineReducers, createSlice } from "@reduxjs/toolkit"
import { storage } from "../../../firebase-config"
import { getDownloadURL, listAll, ref } from "firebase/storage"

const getDirectorySlice = createSlice({
    name: 'getDirectory',
    initialState: {
        directory: {},
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        setRootDirectory(state, action){
            state.directory = action.payload
        },
        setSubItems(state, action){
            const oldState = state.directory
            state.directory = {...oldState, ...action.payload}
        },
        getDirectoryProgress(state, action){
            state.progress = action.payload
        },
        getDirectoryLoading(state, action){
            state.loading = action.payload
        },
        getDirectorySuccess(state, action){
            state.success = action.payload
        },
        getDirectoryError(state, action){
            state.error = action.payload
        }
    }
})

export const {setRootDirectory, setSubItems, getDirectoryLoading, getDirectoryProgress, getDirectorySuccess} = getDirectorySlice.actions;

export const storageReducer = combineReducers({
    getDirectory: getDirectorySlice.reducer,
});

export function getRootDirectory(){
    return async function getRootDirectoryThunk(dispatch){
        dispatch(getDirectoryLoading(true))
        try {
            const storageDirectory = {};
            const listRef = ref(storage, '/');
            const res = await listAll(listRef);
            const { prefixes } = res;
            for (const folderRef of prefixes) {
                storageDirectory[folderRef.name] = []
            }
            dispatch(setRootDirectory(storageDirectory))
            dispatch(getDirectoryLoading(false))
            dispatch(getDirectorySuccess(true))
        } catch(err) {
            dispatch(getDirectoryError(err.message))
        }
    }
}