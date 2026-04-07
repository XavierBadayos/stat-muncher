import { fetchAllPlayerStats } from '@/api/playerStatsApi'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/players/')({
  component: Players,
  loader: async () => await fetchAllPlayerStats()
})

function Players() {
  const data = Route.useLoaderData();

  return (
    <div className='p-12 grid grid-cols-5 gap-4'>
    </div>
  )
}
