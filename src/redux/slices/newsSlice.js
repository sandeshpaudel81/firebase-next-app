import { combineReducers, createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, orderBy, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore"
import {db, realDb} from "../../../firebase-config"
import moment from "moment";
import { ref, remove, set, update } from "firebase/database"
import { getAllNews } from "@/utils/api-util";

const getNews = createSlice({
    name: 'getNews',
    initialState: {
        data: [],
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        setNews(state, action){
            state.data = action.payload
        },
        setNewsLoading(state, action){
            state.loading = action.payload
        },
        setNewsSuccess(state, action){
            state.success = action.payload
        },
        setNewsError(state, action){
            state.error = action.payload
        }
    }
})

const addNewsSlice = createSlice({
    name: 'addNews',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        addNewsLoading(state, action){
            state.loading = action.payload
        },
        addNewsSuccess(state, action){
            state.success = action.payload
        },
        addNewsError(state, action){
            state.error = action.payload
        },
        addNewsReset(state){
            state.success = false
            state.error = ""
        }
    }
})

const editNewsSlice = createSlice({
    name: 'editNews',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        editNewsLoading(state, action){
            state.loading = action.payload
        },
        editNewsSuccess(state, action){
            state.success = action.payload
        },
        editNewsError(state, action){
            state.error = action.payload
        },
        editNewsReset(state){
            state.success = false
            state.error = ""
        }
    }
})

const deleteNewsSlice = createSlice({
    name: 'deleteNews',
    initialState: {
        loading: false,
        success: false,
        error: "",
    },
    reducers: {
        deleteNewsLoading(state, action){
            state.loading = action.payload
        },
        deleteNewsSuccess(state, action){
            state.success = action.payload
        },
        deleteNewsError(state, action){
            state.error = action.payload
        },
        deleteNewsReset(state){
            state.success = false
            state.error = ""
        }
    }
})

export const { setNews, setNewsLoading, setNewsSuccess, setNewsError } = getNews.actions;
export const { addNewsLoading, addNewsSuccess, addNewsError, addNewsReset } = addNewsSlice.actions;
export const { editNewsLoading, editNewsSuccess, editNewsError, editNewsReset } = editNewsSlice.actions;
export const { deleteNewsLoading, deleteNewsSuccess, deleteNewsError, deleteNewsReset } = deleteNewsSlice.actions;

export const newsReducer = combineReducers({
    getNews: getNews.reducer,
    addNews: addNewsSlice.reducer,
    editNews: editNewsSlice.reducer,
    deleteNews: deleteNewsSlice.reducer,
});

// convert timestamp to date

export function timestampToDate(datetime){
    return String(moment(datetime.toDate()).format("dddd, MMMM Do YYYY"))
}

export function fetchNews(){
    return async function fetchNewsThunk(dispatch, getState){
        dispatch(setNewsLoading(true))
        try {
            let news = []
            const News = await getDocs(
                query(collection(db, "news"), orderBy('posted_at', 'desc'))
            );
            const allNewsFromRealDb = await getAllNews()
            News.docs.forEach((doc) => {
                const datetime = timestampToDate(doc.data().posted_at)
                const newsFromRealDb = allNewsFromRealDb.find((n) => n.id === doc.data().metaId);
                news.push({
                    ...doc.data(),
                    id: doc.id,
                    posted_at: datetime,
                    meta_description:newsFromRealDb.content,
                    metaImage: newsFromRealDb.image
                })
            });
            dispatch(setNews(news))
            dispatch(setNewsLoading(false))
            dispatch(setNewsSuccess(true)) 
        } catch(err) {
            dispatch(setNewsLoading(false))
            dispatch(setNewsError(err.message))
        }
    }
}

export function addNews(data){
    return async function addNewsThunk(dispatch){
        dispatch(addNewsLoading(true))
        try {
            await addDoc(collection(db, "news"), {
                title: data.title,
                content: data.content,
                images: data.images,
                metaId: data.slug,
                posted_at: new Date()
            })
            await set(ref(realDb, 'news/' + data.slug), {
                title: data.title,
                content: data.meta_description,
                images: data.metaImage
            });
            dispatch(addNewsLoading(false))
            dispatch(addNewsSuccess(true))
        } catch(err) {
            dispatch(addNewsError(err.message))
        }
    }
}

export function editNews(id, oldSlug, data){
    return async function editNewsThunk(dispatch){
        dispatch(editNewsLoading(true))
        try {
            await updateDoc(doc(db, "news", id), {
                title: data.title,
                content: data.content,
                images: data.images,
                metaId: data.slug
            })
            if (data.slug == oldSlug){
                const updates = {}
                updates['/news/'+oldSlug] = {
                    title: data.title,
                    content: data.meta_description,
                    images: data.metaImage
                }
                await update(ref(realDb), updates)
            } else {
                await remove(ref(realDb, `news/${oldSlug}`))
                await set(ref(realDb, 'news/' + data.slug), {
                    title: data.title,
                    content: data.meta_description,
                    images: data.metaImage
                }); 
            }
            dispatch(editNewsLoading(false))
            dispatch(editNewsSuccess(true))
        } catch(err) {
            dispatch(editNewsError(err.message))
        }
    }
}

export function deleteNews(id, slug){
    return async function deleteNewsThunk(dispatch){
        dispatch(deleteNewsLoading(true))
        try {
            await deleteDoc(doc(db, "news", id))
            await remove(ref(realDb, `news/${slug}`))
            dispatch(deleteNewsLoading(false))
            dispatch(deleteNewsSuccess(true))
        } catch(err) {
            dispatch(deleteNewsError(err.message))
        }
    }
}