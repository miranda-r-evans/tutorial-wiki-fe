'use client'
import { Fragment, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Accordion, AccordionSummary, AccordionDetails, Input, Button} from '@mui/material'
import { updateTutorial, selectTutorialById } from '@/features/tutorial/tutorialSlice'
import { TUTORIAL, TEXT, newSectionTemplate } from '@/util/tutorial'
import TutorialFetchWrapper from './TutorialFetchWrapper'
import TextEditor from './TextEditor'

export default function TutorialEditor ({
  id,
  removeCurrentSection = false
}) {
  return (
  <TutorialFetchWrapper id={id}>
    <TutorialEditorMain id={id} removeCurrentSection={removeCurrentSection} />
  </TutorialFetchWrapper>
  )
}

function TutorialEditorMain ({
  id,
  removeCurrentSection = false
}) {
  const [expand, setExpand] = useState(true)

  const dispatch = useDispatch()

  const tutorialData = useSelector(state => {
    return selectTutorialById(state, id)
  })

  const tutorialRef = useRef(tutorialData)

  const deleteChildSection = (childKey) => {
    const tutorial = JSON.parse(JSON.stringify(tutorialRef.current))
    const idx = tutorial.sections.findIndex((c) => c.id === childKey)
    if (idx > 0 && idx < tutorial.sections.length - 1 && tutorial.sections[idx - 1].type === TEXT && tutorial.sections[idx + 1].type === TEXT) {
      tutorial.sections[idx - 1].value = tutorial.sections[idx - 1].value + tutorial.sections[idx + 1].value
      tutorial.sections.splice(idx + 1, 1)
    }
    tutorial.sections.splice(idx, 1)
    dispatch(updateTutorial(tutorial))
    tutorialRef.current = tutorial
  }

  const insertSection = (firstText, secondText, toInsert, childKey) => {
    let newId
    if (toInsert) {
      newId = toInsert
    } else {
      const newTutorial = newSectionTemplate(TUTORIAL)
      dispatch(updateTutorial(newTutorial))
      newId = newTutorial.id
    }
    const tutorial = JSON.parse(JSON.stringify(tutorialRef.current))
    const idx = tutorial.sections.findIndex((c) => c.id === childKey)
    tutorial.sections.splice(idx, 1, newSectionTemplate(TEXT, { value: firstText }))
    tutorial.sections.splice(idx + 1, 0, { type: TUTORIAL, id: newId })
    tutorial.sections.splice(idx + 2, 0, newSectionTemplate(TEXT, { value: secondText }))
    dispatch(updateTutorial(tutorial))
    tutorialRef.current = tutorial
  }

  const getEditorContent = (text, childKey) => {
    const tutorial = JSON.parse(JSON.stringify(tutorialRef.current))
    const idx = tutorial.sections.findIndex((c) => c.id === childKey)
    tutorial.sections[idx].value = text
    dispatch(updateTutorial(tutorial))
    tutorialRef.current = tutorial
  }

  return (
    <div className='section'>
      <div className='tutorial'>
        <div className='tutorial-border' onClick={() => setExpand(!expand)}>
          <div/>
        </div>
        <Accordion expanded={expand}>
          <AccordionSummary>
            <Input
              value={tutorialRef.current.heading}
              placeholder='Type a heading'
              inputProps={{ 'aria-label': 'tutorial heading input' }}
            />
          </AccordionSummary>
          <AccordionDetails>
            {tutorialRef.current.sections.map((c) =>
              <Fragment key={c.id}>
                {c.type === TUTORIAL &&
                  <TutorialEditor
                    removeCurrentSection={() => deleteChildSection(c.id)}
                    id={c.id}
                  />
                }
                {c.type === TEXT &&
                  <TextEditor
                    value={c.value}
                    createSection={((f, s) => insertSection(f, s, false, c.id))}
                    embedSection={(f, s, tid) => insertSection(f, s, tid, c.id)}
                    onGetEditorContent={(t) => getEditorContent(t, c.id)}
                  />
                }
              </Fragment>
            )}
          </AccordionDetails>
        </Accordion>
      </div>
        {removeCurrentSection &&
          <Button
            className='delete-section-button'
            variant="outlined"
            onClick={() => { removeCurrentSection() }}>
            Delete This Section
          </Button>}
    </div>
  )
}
