import type { PlayerCardData } from "@/types/PlayerCard"
import { PlayerCard } from "./PlayerCard"

interface PlayerCardListProps {
    data: PlayerCardData[]
}

export const PlayerCardList = ({data}: PlayerCardListProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {data.map(player => 
                <PlayerCard key={player.id} data={player}/>
            )}
        </div>
    )
}