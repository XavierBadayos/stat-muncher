import type { PlayerCardData } from "@/types/PlayerCard"
import { Card, CardContent} from "../ui/card"
import { Badge } from "../ui/badge"

interface PlayerCardProps {
  data: PlayerCardData 
}

export const PlayerCard = ({ data }: PlayerCardProps) => {
  return (
    <Card className="group border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <img
          className="w-full object-cover"
          src={data.playerImage}
          alt={data.nickname as string}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent dark:from-black/40 dark:via-black/10 dark:to-transparent"/>
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
          <h3 className="text-lg font-bold tracking-tight">
            {data.name}
          </h3>
          <Badge className="bg-white/20 backdrop-blur text-white border-none">
            {data.teamAbbreviation}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-3 text-center">
          <div>
            <p className="text-2xl font-bold text-primary">{data.pts}</p>
            <p className="text-xs text-muted-foreground">PTS</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{data.reb}</p>
            <p className="text-xs text-muted-foreground">REB</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{data.ast}</p>
            <p className="text-xs text-muted-foreground">AST</p>
          </div>
        </div>
        <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

        <div className="grid grid-cols-3 text-sm text-center">
          <div>
            <p className="font-semibold">{data.min}</p>
            <p className="text-muted-foreground">MIN</p>
          </div>
          <div>
            <p className="font-semibold">{data.fga}</p>
            <p className="text-muted-foreground">FGA</p>
          </div>
          <div>
            <p className="font-semibold">
              {(data.fgPct as number * 100).toFixed(1)}%
            </p>
            <p className="text-muted-foreground">FG%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 text-sm text-center">
          <div>
            <p className="font-medium">{data.w}-{data.l}</p>
            <p className="text-muted-foreground">W-L</p>
          </div>
          <div>
            <p className="font-medium">{data.fta}</p>
            <p className="text-muted-foreground">FTA</p>
          </div>
          <div>
            <p className="font-medium">
              {(data.ftPct as number * 100).toFixed(1)}%
            </p>
            <p className="text-muted-foreground">FT%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};