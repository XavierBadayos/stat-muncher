import type { PlayerStats } from "@/types/PlayerStats"
import { useState } from "react"
import { PlayerStatsTable } from "./PlayerStatsTable";
import { PlayerCardList } from "./PlayerCardList";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { ArrowLeftIcon, ArrowRightIcon, RectangleVerticalIcon, Table } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface PlayerStatsHubProps {
  data: PlayerStats[]
}

export const PlayerStatsHub = ({data}: PlayerStatsHubProps) => {
  const [view, setView] = useState("table");
  const rowsPerPage = 50;
  const pages = Array.from({length: Math.ceil(data.length / rowsPerPage)}, (_, i) => i + 1);
  const [page, setPage] = useState("1");
  const paginatedData = page === "All" ? data : data.slice((Number(page) - Number(1)) * rowsPerPage, Number(page) * rowsPerPage);

  function handleForwardNav() {
    const intPage = Number(page)
    if (intPage >= pages.length) {
      return
    }

    setPage(String(intPage + 1));
  }

  function handleBackNav() {
    const intPage = Number(page)

    if (intPage <= 1) {
      return
    }

    setPage(String(intPage - 1));
  }


  return(
    <div className="flex flex-col gap-6">
      <div className="flex gap-8">
        <ButtonGroup>
          <Button onClick={() => setView("table")} variant={"outline"}>
            <Table />
          </Button>
          <Button onClick={() => setView("card")} variant={"outline"}>
            <RectangleVerticalIcon />
          </Button>
        </ButtonGroup>

        <Select defaultValue={"1"} value={page} onValueChange={(value) => {if (value !== null) setPage(value)}}>
          <SelectTrigger className="w-full max-w-[5rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectGroup>
              <SelectLabel>Pages</SelectLabel>
              <SelectItem key={"All"} value={"All"}>All</SelectItem>
              {pages.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <ButtonGroup aria-label="navigation buttons">
          <Button disabled={Number(page) <= 1 || page === "All"} onClick={handleBackNav} variant={"outline"}><ArrowLeftIcon/></Button>
          <Button disabled={Number(page) >= pages.length || page === "All"} onClick={handleForwardNav} variant={"outline"}><ArrowRightIcon/></Button>
        </ButtonGroup>
      </div>

      {view === "table" ? (
        <PlayerStatsTable data={paginatedData} />
      ) : view === "card" ? (
        <PlayerCardList data={paginatedData} />
      ) : (
        <PlayerStatsTable data={paginatedData} />
      )}
    </div>
  )
}