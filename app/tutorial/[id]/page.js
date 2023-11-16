'use client'
import TutorialBase from '@/components/TutorialBase'
import store from '@/features/store'
import { Provider } from 'react-redux'

export default function Tutorial ({ params }) {
  return <Provider store={store}>
  <TutorialBase id={params.id} />
  </Provider>
}
