export interface AllPlayerStatsResponse {
    resource:   string;
    parameters: Parameters;
    resultSets: ResultSet[];
}

export interface Parameters {
    MeasureType:      string;
    PerMode:          string;
    PlusMinus:        string;
    PaceAdjust:       string;
    Rank:             string;
    LeagueID:         string;
    Season:           string;
    SeasonType:       string;
    PORound:          number;
    Outcome:          null;
    Location:         null;
    Month:            number;
    SeasonSegment:    null;
    DateFrom:         string;
    DateTo:           string;
    OpponentTeamID:   number;
    VsConference:     null;
    VsDivision:       null;
    TeamID:           number;
    Conference:       null;
    Division:         null;
    GameSegment:      null;
    Period:           number;
    ShotClockRange:   null;
    LastNGames:       number;
    GameScope:        null;
    PlayerExperience: null;
    PlayerPosition:   null;
    StarterBench:     null;
    DraftYear:        null;
    DraftPick:        null;
    College:          null;
    Country:          null;
    Height:           null;
    Weight:           null;
    TwoWay:           number;
    GameSubtype:      null;
    ActiveRoster:     number;
    ISTRound:         null;
}

export interface ResultSet {
    name:    string;
    headers: string[];
    rowSet:  Array<Array<number | string>>;
}
