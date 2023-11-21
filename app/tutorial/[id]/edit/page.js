'use client'
import axios from 'axios'
import { Provider } from 'react-redux'
import TutorialEditor from '@/components/TutorialEditor'
import store from '@/features/store'

export default function TutorialEdit ({ params }) {
  return <Provider store={store}>
  <TutorialEditor id={params.id}/>
    <button
    id='save_tutorial_button'
    onClick={async () => {
      const data = {
        tutorials: store.getState().tutorials.entities
      }
      axios.put(`http://localhost:5050/tutorial/${params.id}`, data).then(response => console.log(response))
    }}>Save Tutorial</button>
  </Provider>
}
