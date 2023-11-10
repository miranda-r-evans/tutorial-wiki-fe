'use client'
import axios from 'axios'
import { Provider } from 'react-redux'
import { updateTutorial } from '@/features/tutorial/tutorialSlice'
import store from '@/features/store'
import { TUTORIAL, newSectionTemplate } from '@/util/tutorial'
import TutorialEditor from '@/components/TutorialEditor'

export default function TutorialCreate () {
  const rootTutorial = newSectionTemplate(TUTORIAL)
  const rootId = rootTutorial.id
  store.dispatch(updateTutorial(rootTutorial))

  return <Provider store={store}>
      <TutorialEditor id={rootId} />
    <button onClick={() => {
      const data = {
        tutorials: store.getState().tutorials.entities,
        rootId
      }
      axios.post('http://localhost:5050/tutorial', data).then(response => console.log(response))
    }}>Save Tutorial</button>
        </Provider>
}
