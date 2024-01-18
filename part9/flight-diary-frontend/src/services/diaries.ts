import axios from "axios";
import { NonSensitiveDiaryEntry } from "../types";

const baseUrl = '/api/diaries';

const getAll = async () => {
    try {
        const diaries = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl)
        return diaries.data
    } catch (error: unknown) {
        console.error('Something wrong happen when fetching diaries')
        if (error instanceof Error) {
            console.error(error.message)
        }
    }
}

export default {
    getAll
}