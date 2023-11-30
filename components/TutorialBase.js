import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTutorialById } from '@/features/tutorial/tutorialSlice'
import TutorialFetchWrapper from './TutorialFetchWrapper'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

export default function TutorialBase ({ id }) {
  return (
    <TutorialFetchWrapper id={id}>
      <TutorialBaseMain id={id} />
    </TutorialFetchWrapper>
  )
}

function TutorialBaseMain ({ id }) {
  const [expand, setExpand] = useState(true)

  const tutorial = useSelector(state => {
    return selectTutorialById(state, id)
  })

  return (
    <div className='section'>
      <div className='tutorial'>
        <div className='tutorial-border' onClick={() => setExpand(!expand)}>
          <div/>
        </div>
        <Accordion expanded={expand}>
          <AccordionSummary>
            <h1>{tutorial.heading}</h1>
          </AccordionSummary>
          <AccordionDetails>
            {tutorial.sections.map((c) =>
              <Fragment key={c.id}>
                {c.type === 'text' && <div dangerouslySetInnerHTML={{ __html: c.value }} />}
                {c.type === 'tutorial' && <TutorialBase id={c.id}/>}
              </Fragment>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}
