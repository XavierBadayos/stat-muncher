import { fetchAllPlayerStats } from '@/api/playerStatsApi'
import { PlayerCardList } from '@/components/players/PlayerCardList';
import { PlayerStatsTable } from '@/components/players/PlayerStatsTable';
import { ModeToggle } from '@/components/theme/theme-toggle';
import type { PlayerStats } from '@/types/PlayerStats';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

const playerQuery = queryOptions({
  queryKey: ['players'],
  queryFn: () => fetchAllPlayerStats(),
  staleTime: 1000 * 60 * 60 * 4,
  gcTime: 1000 * 60 * 60 * 24,
})

export const Route = createFileRoute('/players/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(playerQuery),
  component: Players,
})

function Players() {
  const {data}  = useSuspenseQuery(playerQuery)
  
  return (
    <div className='p-12'>
      <ModeToggle />
      {/* <PlayerCardList data={data as PlayerStats[]} /> */}
      <PlayerStatsTable data={data as PlayerStats[]} />
    </div>
  )
} 