export interface Filter {
    index: string
    stat: string;
    operator: "=" | ">" | ">=" | "<" | "<=";
    value: number | string;
    condition: "AND" | "OR";
}