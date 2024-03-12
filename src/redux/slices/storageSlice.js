import { combineReducers, createSlice } from "@reduxjs/toolkit"
import { getPathStorageFromUrl, storage } from "../../../firebase-config"
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from "firebase/storage"

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

const uploadFileSlice = createSlice({
    name: 'uploadFile',
    initialState: {
        file: [],
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        uploadFileData(state, action){
            state.file = [...state.file, action.payload]
        },
        uploadFileLoading(state, action){
            state.loading = action.payload
        },
        uploadFileSuccess(state, action){
            state.success = action.payload
        },
        uploadFileError(state, action){
            state.error = action.payload
        },
        uploadFileReset(state){
            state.file = []
            state.success = false
            state.error = ""
        }
    }
})

const deleteFileSlice = createSlice({
    name: 'deleteFile',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        deleteFileLoading(state, action){
            state.loading = action.payload
        },
        deleteFileSuccess(state, action){
            state.success = action.payload
        },
        deleteFileError(state, action){
            state.error = action.payload
        },
        deleteFileReset(state){
            state.success = false
            state.error = ""
        }
    }
})

export const {uploadFileData, uploadFileLoading, uploadFileSuccess, uploadFileError, uploadFileReset} = uploadFileSlice.actions;
export const {setRootDirectory, setSubItems, getDirectoryLoading, getDirectoryProgress, getDirectorySuccess} = getDirectorySlice.actions;
export const {deleteFileLoading, deleteFileSuccess, deleteFileError, deleteFileReset} = deleteFileSlice.actions;

export const storageReducer = combineReducers({
    getDirectory: getDirectorySlice.reducer,
    uploadFile: uploadFileSlice.reducer,
    deleteFile: deleteFileSlice.reducer,
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

export function getSubDirectory(folderName){
    return async function getSubDirectoryThunk(dispatch){
        const result = {}
        dispatch(getDirectoryLoading(true))
        try {
            const listOfItems = [];
            const listRef = ref(storage, `/${folderName}`);
            const res = await listAll(listRef);
            const { items } = res;
            for (const item of items) {
                listOfItems.push(await getDownloadURL(item))
            }
            result[folderName] = listOfItems
            dispatch(setSubItems(result))
            dispatch(getDirectoryLoading(false))
            dispatch(getDirectorySuccess(true))
        } catch(err) {
            dispatch(getDirectoryError(err.message))
        }
    }
}

export function uploadFile(folder, file){
    return function uploadFileThunk(dispatch){
        dispatch(uploadFileLoading(true))
        const upload = () => {
            try {
                // upload image on firebase
                const storageRef = ref(storage, `/${folder}/${Date.now() + file.name}`)
                const uploadTask = uploadBytesResumable(storageRef, file)
                uploadTask?.on(
                    "state_changed",
                    (snapshot) => {
                        const percent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        )
                    },
                    (err) => {
                        dispatch(uploadFileError(err.message))
                        dispatch(uploadFileLoading(false))
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            dispatch(uploadFileData(url))
                            dispatch(uploadFileLoading(false))
                            dispatch(uploadFileSuccess(true))
                        })
                    }
                )
            } catch(err) {
                dispatch(uploadFileError(err.message))
                dispatch(uploadFileLoading(false))
            }
        }
        upload()
    }
}

export function deleteFile(url){
    return function deleteFileThunk(dispatch){
        dispatch(deleteFileLoading(true))
        try {
            var filePath = getPathStorageFromUrl(url)
            const deleteRef = ref(storage, filePath)
            deleteObject(deleteRef).then(() => {
                dispatch(deleteFileLoading(false))
                dispatch(deleteFileSuccess(true))
            }).catch((error) => {
                dispatch(deleteFileError(error.message))
                dispatch(deleteFileLoading(false))
            })
        } catch(err) {
            dispatch(deleteFileError(err.message))
            dispatch(deleteFileLoading(false))
        }
    }
}