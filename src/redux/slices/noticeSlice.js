import { combineReducers, createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, doc, orderBy, addDoc, updateDoc, deleteDoc} from "firebase/firestore"
import {db, realDb} from "../../../firebase-config"
import moment from "moment";
import { ref, remove, set, update } from "firebase/database";
import { addNoticeToRealDB, deleteNoticeFromRealDB, getAllNotices } from "@/utils/api-util";

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

const addNoticeSlice = createSlice({
    name: 'addNotice',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        addNoticeLoading(state, action){
            state.loading = action.payload
        },
        addNoticeSuccess(state, action){
            state.success = action.payload
        },
        addNoticeError(state, action){
            state.error = action.payload
        },
        addNoticeReset(state){
            state.success = false
            state.error = ""
        }
    }
})

const editNoticeSlice = createSlice({
    name: 'editNotice',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        editNoticeLoading(state, action){
            state.loading = action.payload
        },
        editNoticeSuccess(state, action){
            state.success = action.payload
        },
        editNoticeError(state, action){
            state.error = action.payload
        },
        editNoticeReset(state){
            state.success = false
            state.error = ""
        }
    }
})

const deleteNoticeSlice = createSlice({
    name: 'deleteNotice',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        deleteNoticeLoading(state, action){
            state.loading = action.payload
        },
        deleteNoticeSuccess(state, action){
            state.success = action.payload
        },
        deleteNoticeError(state, action){
            state.error = action.payload
        },
        deleteNoticeReset(state){
            state.success = false
            state.error = ""
        }
    }
})

export const { setNotices, setNoticesLoading, setNoticesSuccess, setNoticesError } = getNotices.actions;
export const { addNoticeLoading, addNoticeSuccess, addNoticeError, addNoticeReset } = addNoticeSlice.actions;
export const { editNoticeLoading, editNoticeSuccess, editNoticeError, editNoticeReset } = editNoticeSlice.actions;
export const { deleteNoticeLoading, deleteNoticeSuccess, deleteNoticeError, deleteNoticeReset } = deleteNoticeSlice.actions;

export const noticesReducer = combineReducers({
    getNotices: getNotices.reducer,
    addNotice: addNoticeSlice.reducer,
    editNotice: editNoticeSlice.reducer,
    deleteNotice: deleteNoticeSlice.reducer,
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
                query(collection(db, "notices"), orderBy('posted_at', 'desc'))
            );
            const allNoticesFromRealDb = await getAllNotices()
            Notices.docs.forEach((doc) => {
                const datetime = timestampToDate(doc.data().posted_at)
                const noticeFromRealDb = allNoticesFromRealDb.find((n) => n.id === doc.data().metaId);
                notices.push({
                    ...doc.data(),
                    id: doc.id,
                    posted_at: datetime,
                    meta_description: noticeFromRealDb.content,
                    metaImage: noticeFromRealDb.images
                })
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

export function addNotice(data){
    return async function addNoticeThunk(dispatch){
        dispatch(addNoticeLoading(true))
        try {
            await addDoc(collection(db, "notices"), {
                title: data.title,
                content: data.content,
                metaId: data.slug,
                files: data.files,
                posted_at: new Date()
            })
            await addNoticeToRealDB(data.slug, {
                title: data.title,
                content: data.meta_description,
                images: data.metaImage
            })
            dispatch(addNoticeLoading(false))
            dispatch(addNoticeSuccess(true))
        } catch(err) {
            dispatch(addNoticeError(err.message))
        }
    }
}

export function editNotice(id, oldSlug, data){
    return async function editNoticeThunk(dispatch){
        dispatch(editNoticeLoading(true))
        try {
            await updateDoc(doc(db, "notices", id), {
                title: data.title,
                content: data.content,
                metaId: data.slug,
                files: data.files
            })
            if (data.slug == oldSlug){
                await addNoticeToRealDB(data.slug, {
                    title: data.title,
                    content: data.meta_description,
                    images: data.metaImage
                })
            } else {
                await deleteNoticeFromRealDB(oldSlug)
                await addNoticeToRealDB(data.slug, {
                    title: data.title,
                    content: data.meta_description,
                    images: data.metaImage
                }) 
            }
            dispatch(editNoticeLoading(false))
            dispatch(editNoticeSuccess(true))
        } catch(err) {
            dispatch(editNoticeError(err.message))
        }
    }
}

export function deleteNotice(id, slug){
    return async function deleteNoticeThunk(dispatch){
        dispatch(deleteNoticeLoading(true))
        try {
            await deleteDoc(doc(db, "notices", id))
            await remove(ref(realDb, `notices/${slug}`))
            dispatch(deleteNoticeLoading(false))
            dispatch(deleteNoticeSuccess(true))
        } catch(err) {
            dispatch(deleteNoticeError(err.message))
        }
    }
}