import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTutorialById } from '@/features/tutorial/tutorialSlice'
import TutorialFetchWrapper from './TutorialFetchWrapper'
import { Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material'

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
    <Box
      className='tutorial'
      sx={{ display: 'flex', flexDirection: 'row', marginTop: 1, marginBotton: 1 }}
    >
      <Box
        className='tutorial-border'
        sx={{ borderRight: 16, borderColor: 'white', bgcolor: 'info.main', width: 20 }}
        onClick={() => setExpand(!expand)}
      />
        <Accordion expanded={expand} sx={{ width: '100%', '& .Mui-expanded': { '& .tutorial-heading': { fontSize: '2rem' } } }}>
          <AccordionSummary>
            <h2 className='tutorial-heading'>{tutorial.heading}</h2>
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
      </Box>
  )
}
