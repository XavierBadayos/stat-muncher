import type { PlayerCardData } from "@/types/PlayerCard"
import { PlayerCard } from "./PlayerCard"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { useState } from "react";

interface PlayerCardListProps {
  data: PlayerCardData[]
}

export const PlayerCardList = ({ data }: PlayerCardListProps) => {
  const rowsPerPage = 50;
  const pageNumbers = Math.ceil(data.length / rowsPerPage);
  const numbers = Array.from({ length: pageNumbers }, (_, i) => i + 1).map(n => ({ label: String(n), value: String(n)}));
  const pages = [{label: "All", value: "All"}, ...numbers];
  const displayedCards = data.slice(0, rowsPerPage);

  const [page, setPage] = useState("1");
  console.log(page)

  return (
    <div className="flex flex-col items-end gap-4">
      <Select defaultValue={"1"} value={page}onValueChange={(value) => {if (value !== null) setPage(value)}}>
        <SelectTrigger className="w-full max-w-[6rem]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            <SelectLabel>Pages</SelectLabel>
            {pages.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {displayedCards.map(player => (
          <PlayerCard key={player.id} data={player} />
        ))}
      </div>
    </div>
  )
}