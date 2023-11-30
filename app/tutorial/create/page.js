'use client'
import { useState } from 'react'
import axios from 'axios'
import { Provider } from 'react-redux'
import { useRouter } from 'next/navigation'
import { ThemeProvider, Button } from '@mui/material'
import { updateTutorial } from '@/features/tutorial/tutorialSlice'
import store from '@/features/store'
import { TUTORIAL, newSectionTemplate } from '@/util/tutorial'
import TutorialEditor from '@/components/TutorialEditor'
import theme from '@/materialUI/theme'
import ErrorPopUp from '@/components/ErrorPopUp'

export default function TutorialCreate () {
  const [saveError, setSaveError] = useState(false)
  const { push } = useRouter()

  const rootTutorial = newSectionTemplate(TUTORIAL)
  const rootId = rootTutorial.id
  store.dispatch(updateTutorial(rootTutorial))

  return (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <TutorialEditor id={rootId} />
      <Button
        id='save_tutorial_button'
        variant="contained"
        onClick={() => {
          const postData = {
            tutorials: store.getState().tutorials.entities,
            rootId
          }
          axios
            .post('http://localhost:5050/tutorial', postData)
            .then(res => {
              if (res.status === 201 && res.data.rootId) {
                push(`/tutorial/${res.data.rootId}`)
              } else {
                setSaveError(true)
              }
            }).catch(error => {
              setSaveError(true)
            })
        }}>Save Tutorial</Button>
      <ErrorPopUp saveError={saveError} onClose={() => setSaveError(false)} />
    </ThemeProvider>
  </Provider>
  )
}
