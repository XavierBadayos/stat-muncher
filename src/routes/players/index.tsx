import { fetchAllPlayerStats } from '@/api/playerStatsApi'
import { PlayerCardList } from '@/components/players/PlayerCardList';
import { ModeToggle } from '@/components/theme/theme-toggle';
import type { PlayerCardData } from '@/types/PlayerCard';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router'

const playerQuery = queryOptions({
  queryKey: ['players'],
  queryFn: () => fetchAllPlayerStats(),
  staleTime: 1000 * 60 * 60,
  gcTime: 1000 * 60 * 60,
})

export const Route = createFileRoute('/players/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(playerQuery),
  component: Players,
})

function Players() {
  const {data}  = useSuspenseQuery(playerQuery)
  
  return (
    <div className='p-12 gap-4'>
      <Link to="/">
        <h1 className='text-lg'>INDEX</h1>
      </Link>
      <ModeToggle />
      <PlayerCardList data={data as PlayerCardData[]}/>
    </div>
  )
} 