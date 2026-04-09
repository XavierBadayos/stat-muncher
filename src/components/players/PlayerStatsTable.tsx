import type { PlayerStats } from "@/types/PlayerStats";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { playerStatsTableColumns } from "./PlayerStatsTableColumns";
import { useState } from "react";

interface PlayerStatsTableProps{
  data: PlayerStats[];
}

export const PlayerStatsTable = ({data}: PlayerStatsTableProps) => {
  const columns = playerStatsTableColumns;
  const [sortedData, setSortedData] = useState({
    data: [...data].sort((a, b) => b.pts - a.pts), order: "desc" as "asc" | "desc", sortKey: "pts" as keyof PlayerStats,          
  });

  function handleSort(column: {label: string; value: keyof PlayerStats}) {
    const key = column.value;
    const isCurrentlySortedByThisColumn = sortedData.sortKey === key;
    const newOrder = isCurrentlySortedByThisColumn && sortedData.order === "desc" 
      ? "asc" 
      : "desc";

    const sorted = [...data].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (typeof valA === "number" && typeof valB === "number") {
        return newOrder === "asc" ? valA - valB : valB - valA;
      }

      const strA = String(valA ?? "");
      const strB = String(valB ?? "");

      return newOrder === "asc" 
        ? strA.localeCompare(strB) 
        : strB.localeCompare(strA);
    });

    setSortedData({
      data: sorted,
      order: newOrder,
      sortKey: key,
    });
  }

return (
  <Table className="text-xs">
    <TableCaption>Player traditional stats.</TableCaption>
    <TableHeader>
      <TableRow>
        {columns.map(c => 
          <TableHead onClick={() => handleSort(c as { label: string; value: keyof PlayerStats })} key={c.label}>{c.label}</TableHead>
        )}
      </TableRow>
    </TableHeader>
    <TableBody>  
      {sortedData.data.map(row =>
      <TableRow key={row.id}>
        <TableCell className="min-w-[140px] w-[140px]">{row.name}</TableCell>
        <TableCell>{row.teamAbbreviation}</TableCell>
        <TableCell className="text-right">{row.age}</TableCell>
        <TableCell className="text-right">{row.gp}</TableCell>
        <TableCell className="text-right">{row.w}</TableCell>
        <TableCell className="text-right">{row.l?.toFixed(1)}</TableCell>
        <TableCell className="text-right">{row.min?.toFixed(1)}</TableCell>
        <TableCell className="text-right">{row.pts?.toFixed(1)}</TableCell>
        <TableCell className="text-right">{row.fgm?.toFixed(1)}</TableCell>
        <TableCell className="text-right">{row.fga?.toFixed(1)}</TableCell>
        <TableCell className="text-right">{row.fgPct != null ? (row.fgPct * 100).toFixed(1) : null}</TableCell>
        <TableCell className="text-right">{row.threePm?.toFixed(1)}</TableCell>
        <TableCell className="text-right">{row.threePa?.toFixed(1)}</TableCell>
        <TableCell className="text-right">{row.threePct != null ? (row.threePct * 100).toFixed(1) : null}</TableCell>
        <TableCell className="text-right">{row.ftm?.toFixed(1)}</TableCell>
        <TableCell className="text-right">{row.fta?.toFixed(1)}</TableCell>
        <TableCell className="text-right">{row.ftPct != null ? (row.ftPct * 100).toFixed(1) : null}</TableCell>
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