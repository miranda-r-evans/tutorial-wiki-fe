import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { TUTORIAL, newSectionTemplate } from '@/util/tutorial'

export const tutorialAdapter = createEntityAdapter()

const initialState = tutorialAdapter.getInitialState({
})

export const fetchTutorial = createAsyncThunk('tutorial/fetchTutorial', async (id) => {
  const response = await axios.get(`http://localhost:5050/tutorial/${id}`)
  return response
})

export const tutorialSlice = createSlice({
  name: 'tutorials',
  initialState,
  reducers: {
    updateTutorial: (state, action) => {
      tutorialAdapter.upsertOne(state, action.payload)
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchTutorial.pending, (state, action) => {
        tutorialAdapter.upsertOne(state, { id: action.meta.arg, status: 'loading' })
      })
      .addCase(fetchTutorial.fulfilled, (state, action) => {
        const tutorials = action.payload.data
        tutorials.forEach(e => {
          for (let i = 0; i < tutorials.length; i++) {
            tutorials[i] = newSectionTemplate(TUTORIAL, tutorials[i])
          }
        })
        tutorialAdapter.upsertMany(state, tutorials)
      })
      .addCase(fetchTutorial.rejected, (state, action) => {
        tutorialAdapter.upsertOne(state, { id: action.meta.arg, status: 'failed' })
      })
  }
}
)

export const { selectById: selectTutorialById } = tutorialAdapter.getSelectors(state => state.tutorials)

export const { updateTutorial } = tutorialSlice.actions

export default tutorialSlice.reducer
