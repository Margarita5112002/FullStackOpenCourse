import { useEffect, useState } from 'react'
import diariesService from './services/diaries';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';
import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';
import { isString } from './utils';

function App() {
    const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        diariesService.getAll().then(entries => {
            if (entries) setDiaries(entries)
        })
    }, []);

    const notify = (msg: string) => {
        setMessage(msg)
        setTimeout(() => {
            setMessage('')
        }, 5000)
    }

    const addDiary = async (newDiary: NewDiaryEntry) => {
        const diaryAdded = await diariesService.add(newDiary)
        if (!diaryAdded) return
        if (isString(diaryAdded)) {
            notify(diaryAdded)
        } else {
            setDiaries(diaries.concat(diaryAdded))
        }
    }

    return <>
        <DiaryForm message={message} addDiary={addDiary} />
        <DiaryList diaries={diaries} />
    </>
}

export default App
