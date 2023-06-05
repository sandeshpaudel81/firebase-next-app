import { combineReducers, createSlice } from "@reduxjs/toolkit";
import {getDocs, query, collection, doc, getDoc} from "firebase/firestore"
import {db} from "../../../firebase-config"

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

export function fetchNews(){
    return async function fetchNewsThunk(dispatch, getState){
        dispatch(setNewsLoading(true))
        try {
            let news = []
            const News = await getDocs(
                query(collection(db, "News"))
            );
            News.docs.forEach((doc) => {
                news.push({ ...doc.data(), id: doc.id})
            });
            dispatch(setNews(news))
            dispatch(setNewsLoading(false))
            dispatch(setNewsSuccess(true)) 
        } catch(err) {
            dispatch(setNewsLoading(false))
            dispatch(setNewsError('Error while fetching news.'))
        }
    }
}