import { fetchAllPlayerStats } from '@/api/playerStatsApi'
import { PlayerCardList } from '@/components/players/PlayerCardList';
import { ModeToggle } from '@/components/theme/theme-toggle';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/players/')({
  component: Players,
  loader: async () => await fetchAllPlayerStats()
})

function Players() {
  const data = Route.useLoaderData() ?? [];

  return (
    <div className='p-12 gap-4'>
      <ModeToggle />
      <PlayerCardList data={data}/>
    </div>
  )
} 