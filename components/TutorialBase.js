import './TutorialBase.css'
import { useSelector } from 'react-redux'
import { selectTutorialById } from '@/features/tutorial/tutorialSlice'
import TutorialFetchWrapper from './TutorialFetchWrapper'

export default function TutorialBase ({ id }) {
  return (
    <TutorialFetchWrapper id={id}>
      <TutorialBaseMain id={id} />
    </TutorialFetchWrapper>
  )
}

function TutorialBaseMain ({ id }) {
  const tutorial = useSelector(state => {
    return selectTutorialById(state, id)
  })

  return (
  <div className='tutorial'>
    <div className='tutorial-border'>
    <h1>{tutorial.heading}</h1>
    <div>
    {tutorial.sections.map((c) =>
        <div key={c.id}>
            {c.type === 'text' && <div dangerouslySetInnerHTML={{ __html: c.value }} />}
            {c.type === 'tutorial' && <TutorialBase id={c.id}/>}
        </div>
    )}
    </div>
    </div>
</div>
  )
}
