export type Overview = {
    icon: string;
    title: string;
    currentValue: number;
    unit: string;
    records: OverviewRecord[];
};

export type OverviewRecord = {
    time: string;
    value: number | string;
};
