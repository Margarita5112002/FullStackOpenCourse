import { useState } from "react"
import { NewDiaryEntry, Visibility, Weather } from "../types"
import { parseNewDiaryEntry } from "../utils"

interface DiaryFormProps {
    addDiary: (diary: NewDiaryEntry) => void
}

const DiaryForm = ({ addDiary }: DiaryFormProps) => {
    const weatherOptions = Object.values(Weather).map(w => 
        w.toString()
    )
    const visibilityOptions = Object.values(Visibility).map(v => 
        v.toString()
    )

    const [date, setDate] = useState('')
    const [weather, setWeather] = useState(weatherOptions[0])
    const [visibility, setVisibility] = useState(visibilityOptions[0])
    const [comment, setComment] = useState('')

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const newDiary = parseNewDiaryEntry({
            date, comment, weather, visibility
        })
        addDiary(newDiary)
    }

    return <>
        <h1>Add new entry</h1>
        <form onSubmit={handleSubmit}>
            <label>
                date:{' '}
                <input type="date"
                name="date"
                value={date}
                onChange={({ target }) => setDate(target.value)}/>
            </label><br/>
            <label>
                weather:{' '}
                <select value={weather}
                onChange={({ target }) => setWeather(target.value)}>
                    {weatherOptions.map(w => 
                        <option key={w} value={w}>
                            {w}
                        </option>
                    )}
                </select>
            </label><br/>
            <label>
                visibility:{' '}
                <select value={visibility} onChange={({ target }) => setVisibility(target.value)}>
                    {visibilityOptions.map(v => 
                        <option key={v} value={v}>
                            {v}
                        </option>
                    )}
                </select>
            </label><br/>
            <label>
                comment:<br/>
                <textarea
                    value={comment}
                    onChange={({target}) => setComment(target.value)}>
                </textarea>
            </label><br/>
            <button>Add</button>
        </form>
    </>
}

export default DiaryForm