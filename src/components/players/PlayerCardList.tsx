import { PlayerCard } from "./PlayerCard"
import type { PlayerStats } from "@/types/PlayerStats";

interface PlayerCardListProps {
  data: PlayerStats[]
}

export const PlayerCardList = ({ data }: PlayerCardListProps) => {
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {data.map(player => (
        <PlayerCard key={player.id} data={player} />
      ))}
    </div>  
  )
}