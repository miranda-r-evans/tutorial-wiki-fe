'use client'
import TutorialBase from '@/components/TutorialBase'
import store from '@/features/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import theme from '@/materialUI/theme'

export default function Tutorial ({ params }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <TutorialBase id={params.id} />
    </ThemeProvider>
  </Provider>
  )
}
