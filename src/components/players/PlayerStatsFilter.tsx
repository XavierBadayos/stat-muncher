import type { Filter } from "@/types/FilterType";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectGroup, SelectItem } from "../ui/select"
import { conditionsArray, operatorsArray } from "./operators"
import { playerStatsTableColumns } from "./PlayerStatsTableColumns"

interface StatsFilterProps{
  data: Filter;
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
}

export const StatsFilter = ({data, filters, setFilters}: StatsFilterProps) => {
  const columns = playerStatsTableColumns;
  const operators = operatorsArray;
  const conditions = conditionsArray;

  function handleParameterChange(key: keyof Filter, value: string | number) {
    const index = Number(data.index);
    const updatedFilter = {...data, [key]: value };
    if (-1 === index) {
      return setFilters([...filters, updatedFilter]);
    }
    setFilters([...filters.slice(0, index), updatedFilter, ...filters.slice(index + 1)])
  }

  return (
    <div id={data.index} className="flex">
      <Select defaultValue="AND" items={conditions} onValueChange={(e) => handleParameterChange("condition", e as string | number)} >
        <SelectTrigger className={"w-18 rounded-r-none border-r-0"}>
          <SelectValue placeholder="condition"/>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {conditions.map(condition =>
              <SelectItem key={condition.value} value={condition.value}>
                {condition.label}
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select defaultValue="name" items={columns} onValueChange={(e) => handleParameterChange("stat", e as string | number)}>
        <SelectTrigger className={"w-21 rounded-l-none rounded-r-none border-l-0 border-r-0"}>
          <SelectValue placeholder="Category"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {columns.map(col =>
              <SelectItem key={col.value} value={col.value}>
                {col.label}
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select defaultValue={"="} items={operators} onValueChange={(e) => handleParameterChange("operator", e as string | number)}>
        <SelectTrigger className={"w-10 rounded-l-none rounded-r-none border-l-0 border-r-0 [&_svg]:hidden"}>
          <SelectValue placeholder="operator"/>
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {operators.map(operator =>
              <SelectItem key={operator.value} value={operator.value}>
                {operator.label}
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input id="filterValueInput" placeholder="Value" className="rounded-l-none border-l-0 w-20" onChange={(e) => handleParameterChange("value", e.target.value)} />
    </div>
  )
}