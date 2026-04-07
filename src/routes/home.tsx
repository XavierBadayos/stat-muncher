import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: Home,
})

function Home() {
  return <div className='grid grid-cols-5'>Hello "/home"!</div>
}
