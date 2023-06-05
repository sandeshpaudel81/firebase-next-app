import { combineReducers, createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, orderBy} from "firebase/firestore"
import {db} from "../../../firebase-config"
import moment from "moment";

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

export const { setNews, setNewsLoading, setNewsSuccess, setNewsError } = getNews.actions;

export const newsReducer = combineReducers({
    getNews: getNews.reducer,
    
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
            News.docs.forEach((doc) => {
                const datetime = timestampToDate(doc.data().posted_at)
                news.push({ ...doc.data(), id: doc.id, posted_at: datetime})
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