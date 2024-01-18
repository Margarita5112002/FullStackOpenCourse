import { NonSensitiveDiaryEntry } from "../types"

const Diary = ({ diary }: { diary: NonSensitiveDiaryEntry }) => {
    return <>
        <h2>{diary.date}</h2>
        <div>visibility: {diary.visibility}</div>
        <div>weather: {diary.weather}</div>
    </>
}

const DiaryList = ({ diaries }: { diaries: NonSensitiveDiaryEntry[] }) => {
    return <>
        <h1>Diary entries</h1>
        {diaries.map(d =>
            <Diary key={d.id} diary={d} />)}
    </>
}

export default DiaryList