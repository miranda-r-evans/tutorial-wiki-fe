import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTutorial, selectTutorialById } from '@/features/tutorial/tutorialSlice'

export default function TutorialFetchWrapper ({ children, id }) {
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
    content = <div>error</div>
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
