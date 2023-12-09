'use client'
import TutorialBase from '@/components/TutorialBase'

export default function Tutorial ({ params }) {
  return (
    <TutorialBase id={params.id} />
  )
}
