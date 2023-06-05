import { combineReducers, createSlice } from "@reduxjs/toolkit"
import { getPathStorageFromUrl, storage } from "../../../firebase-config"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

const uploadImageSlice = createSlice({
    name: 'uploadImage',
    initialState: {
        image: {},
        progress: 0,
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        uploadImageData(state, action){
            state.image = action.payload
        },
        uploadImageProgress(state, action){
            state.progress = action.payload
        },
        uploadImageLoading(state, action){
            state.loading = action.payload
        },
        uploadImageSuccess(state, action){
            state.success = action.payload
        },
        uploadImageError(state, action){
            state.error = action.payload
        },
        uploadImageReset(state){
            state.image = {}
            state.success = false
            state.progress = 0
            state.error = ""
        }
    }
})

const deleteImageSlice = createSlice({
    name: 'deleteImage',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        deleteImageLoading(state, action){
            state.loading = action.payload
        },
        deleteImageSuccess(state, action){
            state.success = action.payload
        },
        deleteImageError(state, action){
            state.error = action.payload
        },
        deleteImageReset(state){
            state.success = false
            state.error = ""
        }
    }
})

export const {uploadImageData, uploadImageProgress, uploadImageLoading, uploadImageSuccess, uploadImageError, uploadImageReset} = uploadImageSlice.actions;
export const {deleteImageLoading, deleteImageSuccess, deleteImageError, deleteImageReset} = deleteImageSlice.actions;

export const imageReducer = combineReducers({
    uploadImage: uploadImageSlice.reducer,
    deleteImage: deleteImageSlice.reducer,
});

export function uploadImage(folder, image){
    return function uploadImageThunk(dispatch){
        dispatch(uploadImageLoading(true))
        const upload = () => {
            try {
                // upload image on firebase
                const storageRef = ref(storage, `/${folder}/${Date.now() + image.name}`)
                const uploadTask = uploadBytesResumable(storageRef, image)
                uploadTask?.on(
                    "state_changed",
                    (snapshot) => {
                        const percent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        )
                        dispatch(uploadImageProgress(percent))
                    },
                    (err) => {
                        dispatch(uploadImageError(err.message))
                        dispatch(uploadImageLoading(false))
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            dispatch(uploadImageData(url))
                            dispatch(uploadImageLoading(false))
                            dispatch(uploadImageSuccess(true))
                        })
                    }
                )
            } catch(err) {
                dispatch(uploadImageError(err.message))
                dispatch(uploadImageLoading(false))
            }
        }
        upload()
    }
}

export function deleteImage(url){
    return function uploadImageThunk(dispatch){
        dispatch(deleteImageLoading(true))
        try {
            var imagePath = getPathStorageFromUrl(url)
            const deleteRef = ref(storage, imagePath)
            deleteObject(deleteRef).then(() => {
                dispatch(deleteImageLoading(false))
                dispatch(deleteImageSuccess(true))
            }).catch((error) => {
                dispatch(deleteImageError(error.message))
                dispatch(deleteImageLoading(false))
            })
        } catch(err) {
            dispatch(deleteImageError(err.message))
            dispatch(deleteImageLoading(false))
        }
    }
}