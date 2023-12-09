'use client'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import { updateTutorial } from '@/features/tutorial/tutorialSlice'
import store from '@/features/store'
import { TUTORIAL, newSectionTemplate } from '@/util/tutorial'
import TutorialEditor from '@/components/TutorialEditor'
import ErrorPopUp from '@/components/ErrorPopUp'

export default function TutorialCreate () {
  const [saveError, setSaveError] = useState(false)
  const dispatch = useDispatch()
  const { push } = useRouter()

  const rootTutorial = newSectionTemplate(TUTORIAL)
  const rootId = rootTutorial.id
  dispatch(updateTutorial(rootTutorial))

  return (
    <>
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
    </>
  )
}
