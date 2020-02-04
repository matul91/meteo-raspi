import { WindRecord, TemperatureRecord, HumidityRecord, PressureRecord } from '../../types/conditions';

export type CurrentConditionsData = {
    wind: WindRecord[];
    temperature: TemperatureRecord[];
    humidity: HumidityRecord[];
    pressure: PressureRecord[];
}
