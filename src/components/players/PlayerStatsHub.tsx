import type { PlayerStats } from "@/types/PlayerStats"
import { useState } from "react"
import { PlayerStatsTable } from "./PlayerStatsTable";
import { PlayerCardList } from "./PlayerCardList";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpDownIcon, RectangleVerticalIcon, TableIcon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "../ui/combobox";
import { playerStatsTableColumns } from "./PlayerStatsTableColumns";
import type { Filter } from "@/types/FilterType";
import { StatsFilter } from "./PlayerStatsFilter";
import { applyFilters } from "./playerStatsFunctions";

interface PlayerStatsHubProps {
  data: PlayerStats[]
}

interface Category {
  label: keyof PlayerStats;
  direction: string;
}

export const PlayerStatsHub = ({data}: PlayerStatsHubProps) => {
  const [view, setView] = useState("table");

  const rowsPerPage = 50;
  const pages = Array.from({length: Math.ceil(data.length / rowsPerPage)}, (_, i) => i + 1);
  const [page, setPage] = useState("1");
  const [sortedCategory, setSortedCategory] = useState<Category>({label: "pts", direction: "desc"});
  const [filters, setFilters] = useState<Filter[]>([]);
  const filteredData = applyFilters(data, filters);
  const paginatedData = page === "All" ? sortData(filteredData, sortedCategory) : sortData(filteredData, sortedCategory).slice((Number(page) - Number(1)) * rowsPerPage, Number(page) * rowsPerPage);

  const categories = playerStatsTableColumns.map(col => ({label: col.label, value: col.value}));

  //TODO CLEAN THIS MESS OF A COMPONENT UP! I'VE CREATED BOLOGNESE!
  function sortData(data: PlayerStats[], category: Category): PlayerStats[] {
    const sorted = [...data];

    if (category.label !== "name" && category.label !== "teamAbbreviation") {
      if (category.direction === "desc"){
        return sorted.sort((a, b) => Number(b[category.label]) - Number(a[category.label]));
      }
      else if (category.direction === "asc") {
        return sorted.sort((a, b) => Number(a[category.label]) - Number(b[category.label]));
      }
    }
    else {
      if (category.direction === "desc"){
        return sorted.sort((a, b) => String(b[category.label]).toLowerCase().localeCompare(String(a[category.label]).toLowerCase()));
      }
      else if (category.direction === "asc") {
        return sorted.sort((a, b) => String(a[category.label]).toLowerCase().localeCompare(String(b[category.label]).toLowerCase()));
      }
    }

    return sorted.sort((a, b) => Number(b[category.label]) - Number(a[category.label]));
  }


  function handleForwardNav() {
    const intPage = Number(page)
    if (intPage >= pages.length) {
      return
    }

    setPage(String(intPage + 1));
  }

  function handleBackNav() {
    const intPage = Number(page);

    if (intPage <= 1) {
      return
    }

    setPage(String(intPage - 1));
  }

  function handleSortDirection() {
    if (sortedCategory.direction === "asc") {
      setSortedCategory({label: sortedCategory.label, direction: "desc"});
    }

    else {
      setSortedCategory({label: sortedCategory.label, direction: "asc"});
    }
  }

  return(
    <div className="flex flex-col gap-3">
      <div className="flex gap-4 items-center justify:start lg:justify-end">
        <ButtonGroup>
          <Button onClick={() => setView("table")} variant="outline"><TableIcon/></Button>
          <Button onClick={() => setView("card")} variant="outline"><RectangleVerticalIcon/></Button>
        </ButtonGroup>

        {filters.length > 0 &&
          <div>
            {filters.map(filter => 
            <StatsFilter key={filter.index} data={filter} filters={filters} setFilters={setFilters} />
          )}
          </div>
        }

        <Button variant={"outline"} onClick={() => setFilters([...filters, {index: String(filters.length), stat: "name", operator: "=", value: "", condition: "AND"}])}>
          Add filter  
        </Button>

        <ButtonGroup>
          <Combobox items={categories} autoHighlight>
            <ComboboxInput size={5} onFocus={(e) => e.target.select()} placeholder="Sort by..." />
            <ComboboxContent>
              <ComboboxEmpty>No categories found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.label} onClick={() => setSortedCategory({label: item.value, direction: sortedCategory.direction})} value={item.label}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <Button onClick={handleSortDirection} variant="outline"><ArrowUpDownIcon/></Button>
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

        <div className="text-sm font-medium tracking-tight">of 12</div>

        <ButtonGroup aria-label="navigation buttons">
          <Button disabled={Number(page) <= 1 || page === "All"} onClick={handleBackNav} variant={"outline"}><ArrowLeftIcon/></Button>
          <Button disabled={Number(page) >= pages.length || page === "All"} onClick={handleForwardNav} variant={"outline"}><ArrowRightIcon/></Button>
        </ButtonGroup>
      </div>

      {view === "table" ? (
        <PlayerStatsTable data={paginatedData} sortedCategory={sortedCategory} setSortedCategory={setSortedCategory} />
      ) : view === "card" ? (
        <PlayerCardList data={paginatedData} />
      ) : (
        <PlayerStatsTable data={paginatedData} sortedCategory={sortedCategory} setSortedCategory={setSortedCategory} />
      )}
    </div>
  )
}