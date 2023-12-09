'use client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import store from '@/features/store'
import theme from '@/materialUI/theme'

export default function Providers ({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </Provider>
  )
}
