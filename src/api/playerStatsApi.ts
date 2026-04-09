import { transformPlayerStatsResponseToPlayerStats } from "@/transformers/playerTransformers";
import type { AllPlayerStatsResponse } from "@/types/AllPlayerStatsResponse";
import { createServerFn } from "@tanstack/react-start";
import { playerStatsHeader } from "./headers";
import type { PlayerStats } from "@/types/PlayerStats";

export const fetchAllPlayerStats = createServerFn({method: "GET"}).handler(async () => {
    const url = `https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&ISTRound=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2025-26&SeasonSegment=&SeasonType=Regular%20Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=`

    try {
        const response = await fetch(url, {headers: playerStatsHeader});

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
            throw new Error(`NBA Stats API returned ${response.status}`);
        }

        const responseData: AllPlayerStatsResponse = await response.json();
        const data: PlayerStats[] = transformPlayerStatsResponseToPlayerStats(responseData);
        return data;

    }   catch (error) {
        console.error('Fetch failed:');
    }
})