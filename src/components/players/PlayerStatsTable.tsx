import type { PlayerStats } from "@/types/PlayerStats";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { playerStatsTableColumns } from "./PlayerStatsTableColumns";
import { useState } from "react";

interface PlayerStatsTableProps{
  data: PlayerStats[];
}

export const PlayerStatsTable = ({data}: PlayerStatsTableProps) => {
  const columns = playerStatsTableColumns;
  const [sortByStat, setSortByStat] = useState('pts');

  return (
    <Table>
      <TableCaption>Player traditional stats.</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map(c => 
            <TableHead key={c}>{c}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>  
        {data.map(row =>
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell className="text-right">{row.age?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.gp?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.w?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.l?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.min?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.pts?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.fgm?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.fga?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.fgPct?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.threePm?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.threePa?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.threePct?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.ftm?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.fta?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.ftPct?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.oreb?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.dreb?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.reb?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.ast?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.tov?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.stl?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.blk?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.pf?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.fp?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.dd2?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.td3?.toFixed(1)}</TableCell>
            <TableCell className="text-right">{row.plusMinus?.toFixed(1)}</TableCell>
          </TableRow>
        )}       
      </TableBody>
    </Table>    
  )
}
