'use client'
import TutorialBase from '@/components/TutorialBase'
import TutorialFetchWrapper from '@/components/TutorialFetchWrapper'
import store from '@/features/store'
import { Provider } from 'react-redux'

export default function Tutorial ({ params }) {
  return <Provider store={store}>
  <TutorialFetchWrapper id={params.id}>
  <TutorialBase id={params.id} />
  </TutorialFetchWrapper>
  </Provider>
}
