import type { AllPlayerStatsResponse } from "@/types/AllPlayerStatsResponse"
import type { PlayerCardData } from "@/types/PlayerCard"
import { IDX } from "./AllPlayerStatsIndexMap";
import type { PlayerStats } from "@/types/PlayerStats";

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

export function transformPlayerStatsResponseToPlayerStats(response: AllPlayerStatsResponse): PlayerStats[] {
    const rowSets = response.resultSets[0].rowSet;
    const playerStats = rowSets.map(row => ({
        id: String(row[IDX.PLAYER_ID]),
        name: String(row[IDX.PLAYER_NAME]),
        nickname: String(row[IDX.NICKNAME]),
        teamId: String(row[IDX.TEAM_ID]),
        teamAbbreviation: String(row[IDX.TEAM_ABBREVIATION]),
        playerImage: `https://cdn.nba.com/headshots/nba/latest/260x190/${row[IDX.PLAYER_ID]}.png`,
        age: Number(row[IDX.AGE]),
        gp: Number(row[IDX.GP]),
        w: Number(row[IDX.W]),
        l: Number(row[IDX.L]),
        min: Number(row[IDX.MIN]),
        pts: Number(row[IDX.PTS]),
        fgm: Number(row[IDX.FGM]),
        fga: Number(row[IDX.FGA]),
        fgPct: Number(row[IDX.FG_PCT]),
        threePm: Number(row[IDX.FG3M]),
        threePa: Number(row[IDX.FG3A]),
        threePct: Number(row[IDX.FG3_PCT]),
        ftm: Number(row[IDX.FTM]),
        fta: Number(row[IDX.FTA]),
        ftPct: Number(row[IDX.FT_PCT]),
        oreb: Number(row[IDX.OREB]),
        dreb: Number(row[IDX.DREB]),
        reb: Number(row[IDX.REB]),
        ast: Number(row[IDX.AST]),
        tov: Number(row[IDX.TOV]),
        stl: Number(row[IDX.STL]),
        blk: Number(row[IDX.BLK]),
        pf: Number(row[IDX.PF]),
        plusMinus: Number(row[IDX.PLUS_MINUS]),
        fp: Number(row[IDX.NBA_FANTASY_PTS]),
        dd2: Number(row[IDX.DD2]),
        td3: Number(row[IDX.TD3])
    }))

    return playerStats;
}