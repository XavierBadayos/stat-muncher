import type { AllPlayerStatsResponse } from "@/types/AllPlayerStatsResponse"
import type { PlayerCardData } from "@/types/PlayerCard"
import { IDX } from "./AllPlayerStatsIndexMap";

export function transformPlayerStatsResponseToPlayerCards(response: AllPlayerStatsResponse): PlayerCardData[] {
    const rowSets = response.resultSets[0].rowSet;

    const playerCards = rowSets.map(row => ({
        id: row[IDX.PLAYER_ID],
        name: row[IDX.PLAYER_NAME],
        nickname: row[IDX.NICKNAME],
        teamId: row[IDX.TEAM_ID],
        teamAbbreviation: row[IDX.TEAM_ABBREVIATION],
        playerImage: `https://cdn.nba.com/headshots/nba/latest/260x190/${row[IDX.PLAYER_ID]}.png`,
        gp: row[IDX.GP],
        w: row[IDX.W],
        l: row[IDX.L],
        min: row[IDX.MIN],
        pts: row[IDX.PTS],
        ast: row[IDX.AST],
        reb: row[IDX.REB],
        fga: row[IDX.FGA],
        fgm: row[IDX.FGM],
        fgPct: row[IDX.FG_PCT],
        fta: row[IDX.FTA],
        ftm: row[IDX.FTM],
        ftPct: row[IDX.FT_PCT]
    }))

    return playerCards;
}