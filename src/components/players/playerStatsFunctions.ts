import type { Category } from "@/types/Category";
import type { Filter } from "@/types/FilterType";
import type { PlayerStats } from "@/types/PlayerStats";

export const applyFilters = (dataset: any[], filters: Filter[]) => {
  if (!filters || filters.length === 0) return dataset;

  return dataset.filter((row) => {
    let rowPasses = true;

    filters.forEach((config, i) => {
      if (config.value === "" || config.value === undefined) return;

      const rowValue = row[config.stat];
      const filterValue = config.value;
      let currentFilterResult = false;

      const isTextField = config.stat === 'name' || config.stat === 'teamAbbreviation';

      if (isTextField && config.operator === '=') {
        const safeRowStr = String(rowValue || "").toLowerCase();
        const safeFilterStr = String(filterValue || "").toLowerCase();
        
        currentFilterResult = safeRowStr.includes(safeFilterStr);

      } else {
        const rVal = isNaN(Number(rowValue)) ? rowValue : Number(rowValue);
        const fVal = isNaN(Number(filterValue)) ? filterValue : Number(filterValue);

        if (config.operator === '>') currentFilterResult = rVal > fVal;
        else if (config.operator === '<') currentFilterResult = rVal < fVal;
        else if (config.operator === '>=') currentFilterResult = rVal >= fVal;
        else if (config.operator === '<=') currentFilterResult = rVal <= fVal;
        else if (config.operator === '=') currentFilterResult = rVal === fVal;
      }

      if (i === 0) {
        rowPasses = currentFilterResult;
      } else {
        if (config.condition === 'AND') {
          rowPasses = rowPasses && currentFilterResult;
        } else if (config.condition === 'OR') {
          rowPasses = rowPasses || currentFilterResult;
        }
      }
    });

    return rowPasses;
  });
};

export function sortData(data: PlayerStats[], category: Category): PlayerStats[] {
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