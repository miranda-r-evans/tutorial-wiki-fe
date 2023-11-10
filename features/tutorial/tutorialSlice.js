import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const tutorialAdapter = createEntityAdapter()

const initialState = tutorialAdapter.getInitialState({
  status: 'idle',
  error: null
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
    },
    updateMultipleTutorials: (state, action) => {
      tutorialAdapter.upsertMany(state, action.payload)
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchTutorial.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTutorial.fulfilled, (state, action) => {
        state.status = 'succeeded'
        tutorialAdapter.upsertMany(state, action.payload.data)
      })
      .addCase(fetchTutorial.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
}
)

export const { selectById: selectTutorialById } = tutorialAdapter.getSelectors(state => state.tutorials)

export const { updateTutorial, updateMultipleTutorials } = tutorialSlice.actions

export default tutorialSlice.reducer
