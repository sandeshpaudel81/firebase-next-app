import { configureStore } from '@reduxjs/toolkit'
import { carouselReducer } from './slices/carouselSlice'
import { projectReducer } from './slices/projectSlice'

export const store = configureStore({
    reducer: {
        project: projectReducer,
        carousel: carouselReducer,
    },
})
