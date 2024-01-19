import { NewDiaryEntry, Visibility, Weather } from "./types";

export const isString = (value: unknown): value is string => {
    return typeof value === "string" || value instanceof String;
};

const parseString = (value: unknown, field: string = ""): string => {
    if (!isString(value)) {
        throw new Error(`incorrect ${field}`)
    }
    return value
}

const isVisibility = (value: string): value is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(value)
}

const parseVisibility = (value: unknown): Visibility => {
    if (!isString(value) || !isVisibility(value)){
        throw new Error('incorrect visibility')
    }
    return value
}

const isWeather = (value: string): value is Weather => {
    return Object.values(Weather).map(w => w.toString()).includes(value)
}

const parseWeather = (value: unknown): Weather => {
    if (!isString(value) || !isWeather(value)) {
        throw new Error('incorrect weather')
    }
    return value
}

export const parseNewDiaryEntry = (data: unknown): NewDiaryEntry => {
    if (!data || typeof data !== 'object') {
        throw new Error('new diary entry should be an object')
    }
    if ('visibility' in data && 'weather' in data && 'date' in data && 'comment' in data) {
        return {
            visibility: parseVisibility(data.visibility),
            weather: parseWeather(data.weather),
            date: parseString(data.date),
            comment: parseString(data.comment)
        }
    }
    throw new Error('missing parameters for new diary entry')
}