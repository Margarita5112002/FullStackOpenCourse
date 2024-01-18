import { useEffect, useState } from 'react'
import diariesService from './services/diaries';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';

function App() {
    const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

    useEffect(() => {
        diariesService.getAll().then(entries => {
            if (entries) setDiaries(entries)
        })
    }, []);

    const addDiary = async (newDiary: NewDiaryEntry) => {
        const diaryAdded = await diariesService.add(newDiary)
        if (diaryAdded) {
            setDiaries(diaries.concat(diaryAdded))
        }
    }

    return <>
        <DiaryForm addDiary={addDiary} />
        <DiaryList diaries={diaries} />
    </>
}

export default App
