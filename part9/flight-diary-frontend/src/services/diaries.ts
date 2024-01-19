import axios from "axios";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

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

const add = async (diary: NewDiaryEntry): Promise<DiaryEntry | string | undefined> => {
    try {
        const addedDiary = await axios.post<DiaryEntry>(baseUrl, diary)
        return addedDiary.data
    } catch (error: unknown) {
        console.error('Something wrong happen when adding new diary')
        if (axios.isAxiosError(error)) {
            return error.response?.data
        } else if (error instanceof Error) {
            console.error('error not from axios', error.message)
        }
    }
}

export default {
    getAll, add
}