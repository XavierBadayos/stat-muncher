import type { PlayerCardData } from "@/types/PlayerCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
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
            <Badge className="text-xs" variant={"secondary"}>{data.teamAbbreviation}</Badge>
          </div>
        <CardDescription className="flex justify-between">
          <p>{data.pts} pts</p>
          <p>{data.reb} reb</p>
          <p>{data.ast} ast</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-start gap-9">
        <div className="flex gap-3">
          <div className="font-medium">
            <p>{data.min}</p>
            <p>{data.fga}</p>
            <p>{(data.fgPct as number * 100).toFixed(1)}</p>
          </div>
          <div>
            <p>MIN</p>
            <p>FGA</p>
            <p>FG%</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="font-medium">
          <p>{(data.fga as number).toFixed(1)}</p>
          <p>{(data.fta as number).toFixed(1)}%</p>
          <p>{data.w}-{data.l}</p>
          </div>
          <div>
            <p>FTA</p>
            <p>FT%</p>
            <p>W-L</p>
          </div>
        </div>
        
      </CardContent>
    </Card>
  )
}