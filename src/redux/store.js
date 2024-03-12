import { configureStore } from '@reduxjs/toolkit'
import { carouselReducer } from './slices/carouselSlice'
import { projectReducer } from './slices/projectSlice'
import { sidebarReducer } from './slices/sidebarSlice'
import { donorsPartnersReducer } from './slices/donorsPartnersSlice'
import { imageReducer } from './slices/imageSlice'
import { noticesReducer } from './slices/noticeSlice'
import { newsReducer } from './slices/newsSlice'
import { teamReducer } from './slices/teamSlice'
import { galleryReducer } from './slices/gallerySlice'
import { publicationsReducer } from './slices/publicationSlice'
import { storageReducer } from './slices/storageSlice'

export const store = configureStore({
    reducer: {
        project: projectReducer,
        carousel: carouselReducer,
        sidebar: sidebarReducer,
        donorsPartners: donorsPartnersReducer,
        notice: noticesReducer,
        news: newsReducer,
        team: teamReducer,
        gallery: galleryReducer,
        publications: publicationsReducer,
        storage: storageReducer,
        image: imageReducer,
    },
})
