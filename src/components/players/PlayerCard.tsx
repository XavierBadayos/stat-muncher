import type { PlayerCardData } from "@/types/PlayerCard"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

interface PlayerCardProps {
  data: PlayerCardData 
}

export const PlayerCard = ({data}: PlayerCardProps) => {
  return (
    <Card>
      <img className="object-fit bg-slate-800" src={data.playerImage} alt={data.nickname as string}/>
      <CardHeader >
          <div className="flex justify-between pb-2">
            <CardTitle><h3>{data.name}</h3></CardTitle>
            <Badge className="text-xs">{data.teamAbbreviation}</Badge>
          </div>
        <CardDescription className="flex justify-between">
          <p>{data.pts} pts</p>
          <p>{data.reb} reb</p>
          <p>{data.ast} ast</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2">
        <div>
          <p>{data.min} MIN</p>
          <p>{data.fga} FGA</p>
          <p>{(data.fgPct as number * 100).toFixed(1)} FG%</p>
        </div>
        <div>
          <p>{(data.fga as number).toFixed(1)} FTA</p>
          <p>{(data.fta as number).toFixed(1)} FT%</p>
          <p>{data.w}-{data.l} W-L</p>
        </div>
      </CardContent>
    </Card> 
  )
}