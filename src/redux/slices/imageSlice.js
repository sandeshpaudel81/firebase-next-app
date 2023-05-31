import { combineReducers, createSlice } from "@reduxjs/toolkit"

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
            state.error = ""
        }
    }
})

const deleteImageSlice = createSlice({
    name: 'deleteImage',
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
            state.error = ""
        }
    }
})

export const {uploadImageData, uploadImageProgress, uploadImageLoading, uploadImageSuccess, uploadImageError, uploadImageReset} = uploadImageSlice.actions;

export const imageReducer = combineReducers({
    uploadImage: uploadImageSlice.reducer
});

export function uploadImage(folder, image){
    return function uploadImageThunk(dispatch){
        dispatch(uploadImageLoading(true))
        try {
            // upload image on firebase
            const storageRef = ref(storage, `/${folder}/${image.name}`)
            const uploadTask = uploadBytesResumable(storageRef, image)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    dispatch(uploadImageProgress(percent))
                },
                (err) => {
                    dispatch(uploadImageError(err.message))
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        dispatch(uploadImageData(url))
                    })
                }
            )
            dispatch(uploadImageData("url"))
            dispatch(uploadImageLoading(false))
            dispatch(uploadImageSuccess(true))
        } catch(err) {
            dispatch(uploadImageError(err.message))
        }
    }
}