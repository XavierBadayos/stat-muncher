import type { PlayerStats } from "./PlayerStats";

export interface Category {
    label: keyof PlayerStats;
     direction: string;
}