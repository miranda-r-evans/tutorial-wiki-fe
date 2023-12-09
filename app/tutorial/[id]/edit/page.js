'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from '@mui/material'
import TutorialEditor from '@/components/TutorialEditor'
import store from '@/features/store'
import ErrorPopUp from '@/components/ErrorPopUp'

export default function TutorialEdit ({ params }) {
  const [saveError, setSaveError] = useState(false)
  const { push } = useRouter()

  return (
    <>
      <TutorialEditor id={params.id}/>
        <Button
          id='save_tutorial_button'
          variant="contained"
          onClick={async () => {
            const data = {
              tutorials: store.getState().tutorials.entities
            }
            axios
              .put(`http://localhost:5050/tutorial/${params.id}`, data)
              .then(res => {
                if (res.status === 201 && res.data.rootId) {
                  push(`/tutorial/${res.data.rootId}`)
                } else {
                  setSaveError(true)
                }
              })
              .catch(error => {
                setSaveError(true)
              })
          }}>Save Tutorial</Button>
        <ErrorPopUp saveError={saveError} onClose={() => setSaveError(false)} />
      </>
  )
}
