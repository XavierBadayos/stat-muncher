import type { Filter } from "@/types/FilterType";

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