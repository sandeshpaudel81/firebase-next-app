import { configureStore } from '@reduxjs/toolkit'
import { carouselReducer } from './slices/carouselSlice'
import { projectReducer } from './slices/projectSlice'
import { sidebarReducer } from './slices/sidebarSlice'
import { imageReducer } from './slices/imageSlice'

export const store = configureStore({
    reducer: {
        project: projectReducer,
        carousel: carouselReducer,
        sidebar: sidebarReducer,
        image: imageReducer,
    },
})
