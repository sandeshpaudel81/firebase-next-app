import { configureStore } from '@reduxjs/toolkit'
import { carouselReducer } from './slices/carouselSlice'
import { projectReducer } from './slices/projectSlice'
import { sidebarReducer } from './slices/sidebarSlice'
import { imageReducer } from './slices/imageSlice'
import { donorsPartnersReducer } from './slices/donorsPartnersSlice'
import { noticesReducer } from './slices/noticeSlice'

export const store = configureStore({
    reducer: {
        project: projectReducer,
        carousel: carouselReducer,
        sidebar: sidebarReducer,
        image: imageReducer,
        donorsPartners: donorsPartnersReducer,
        notice: noticesReducer,
    },
})
