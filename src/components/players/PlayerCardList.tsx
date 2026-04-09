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
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { PlayerStats } from "@/types/PlayerStats";

interface PlayerCardListProps {
  data: PlayerStats[]
}

export const PlayerCardList = ({ data }: PlayerCardListProps) => {
  const rowsPerPage = 50;
  const pageNumbers = Math.ceil(data.length / rowsPerPage);
  const numbers = Array.from({ length: pageNumbers }, (_, i) => i + 1).map(n => ({ label: String(n), value: String(n)}));
  const pages = [{label: "All", value: "All"}, ...numbers];
  const pageCount = numbers[numbers.length - 1].value
  const [page, setPage] = useState("1");


  const displayedCards = () => {
    if (page === "All") {
      return data;
    }
    return data.slice((Number(page) - 1) * rowsPerPage, Number(page) * rowsPerPage)
  };

  function navigateForwardPage() {
    if (Number(page) >= 1 && Number(page) < Number(pageCount)) {
      setPage((String(Number(page) + 1)));
    }
  }

  function navigateBackwardPage() {
    if (Number(page) <= Number(pageCount) && Number(page) > 1) {
      setPage((String(Number(page) - 1)));
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center justify-end">
        <Select defaultValue={"1"} value={page}onValueChange={(value) => {if (value !== null) setPage(value)}}>
          <SelectTrigger className="w-full max-w-[5rem]">
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

        <p className="text-md font-bold">OF {pageCount}</p>

        <ButtonGroup aria-label="navigation buttons">
          <Button disabled={Number(page) <= 1 || page === "All"} onClick={navigateBackwardPage} variant={"outline"}><ArrowLeftIcon/></Button>
          <Button disabled={Number(page) >= Number(pageCount) || page === "All"} onClick={navigateForwardPage} variant={"outline"}><ArrowRightIcon/></Button>
        </ButtonGroup>
      </div>
      
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {displayedCards().map(player => (
          <PlayerCard key={player.id} data={player} />
        ))}
      </div>
    </div>
  )
}