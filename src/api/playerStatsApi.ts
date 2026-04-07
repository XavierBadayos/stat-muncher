import { transformPlayerStatsResponseToPlayerCards } from "@/transformers/playerTransformers";
import type { AllPlayerStatsResponse } from "@/types/AllPlayerStatsResponse";
import type { PlayerCardData } from "@/types/PlayerCard";
import { createServerFn } from "@tanstack/react-start";

export const fetchAllPlayerStats = createServerFn({method: "GET"}).handler(async () => {
    const url = `https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&ISTRound=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2025-26&SeasonSegment=&SeasonType=Regular%20Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=`
    const headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Referer": "https://www.nba.com/",
        "Origin": "https://www.nba.com",
        "x-nba-stats-origin": "stats",
        "x-nba-stats-token": "true",
        "Accept-Language": "en-US,en;q=0.9",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors"
    }

    try {
        const response = await fetch(url, {headers});

        if (!response.ok) {
            console.log(`HTTP error! status: ${response.status}`);
            throw new Error(`NBA Stats API returned ${response.status}`);
        }

        const responseData: AllPlayerStatsResponse = await response.json();
        const data: PlayerCardData[] = transformPlayerStatsResponseToPlayerCards(responseData);
        return data;

    }   catch (error) {
        console.error('Fetch failed:');
    }
})