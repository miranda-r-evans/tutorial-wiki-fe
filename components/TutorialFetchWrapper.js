import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTutorial, selectTutorialById } from '@/features/tutorial/tutorialSlice'
import ErrorPopUp from '@/components/ErrorPopUp'

export default function TutorialFetchWrapper ({ children, id }) {
  const [saveError, setSaveError] = useState(true)

  const tutorialData = useSelector(state => {
    return selectTutorialById(state, id)
  })

  const dispatch = useDispatch()

  let content

  if (!tutorialData) {
    content = <></>
  } else if (tutorialData.status === 'loading') {
    content = <></>
  } else if (tutorialData.status === 'failed') {
    content = <ErrorPopUp saveError={saveError} onClose={() => setSaveError(false)} />
  } else if (tutorialData.status === 'succeeded') {
    content = <>{children}</>
  }

  useEffect(() => {
    if (!tutorialData) {
      dispatch(fetchTutorial(id))
    }
  }, [tutorialData, dispatch])

  return content
}
