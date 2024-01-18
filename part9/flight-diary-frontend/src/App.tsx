import { useEffect, useState } from 'react'
import diariesService from './services/diaries';
import { NonSensitiveDiaryEntry } from './types';
import DiaryList from './components/DiaryList';

function App() {
    const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

    useEffect(() => {
        diariesService.getAll().then(entries => {
            if (entries) setDiaries(entries)
        })
    }, []);

    return <>
        <DiaryList diaries={diaries} />
    </>
}

export default App
