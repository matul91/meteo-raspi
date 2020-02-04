export type ConditionsType = 'wind' | 'temperature' | 'humidity' | 'pressure';

export type TemperatureRecord = {
    value: number;
    date?: string;
}

export type PressureRecord = {
    value: number;
    date?: string;
}

export type HumidityRecord = {
    value: number;
    date?: string;
}

export type WindRecord = {
    value: number;
    direction: WindDirection;
    date?: string;
}

export type WindDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
