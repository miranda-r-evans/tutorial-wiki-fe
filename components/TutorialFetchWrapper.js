import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTutorial } from '@/features/tutorial/tutorialSlice'

export default function TutorialFetchWrapper ({ children, id }) {
  const dispatch = useDispatch()

  const tutorialStatus = useSelector(state => state.tutorials.status)

  let content

  if (tutorialStatus === 'loading') {
    content = <></>
  } else if (tutorialStatus === 'succeeded') {
    content = <>{children}</>
  } else if (tutorialStatus === 'failed') {
    content = <div>error</div>
  }

  useEffect(() => {
    if (tutorialStatus === 'idle') {
      dispatch(fetchTutorial(id))
    }
  }, [tutorialStatus, dispatch])

  return content
}
