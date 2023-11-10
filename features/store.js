import { configureStore } from '@reduxjs/toolkit'
import tutorialReducer from '@/features/tutorial/tutorialSlice'

const store = configureStore({
  reducer: {
    tutorials: tutorialReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
})

export default store
