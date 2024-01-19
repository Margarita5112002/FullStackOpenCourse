import { useState } from "react"
import { NewDiaryEntry, Visibility, Weather } from "../types"
import { parseNewDiaryEntry } from "../utils"
import RadioGroup from "./RadioGroup"

interface DiaryFormProps {
    addDiary: (diary: NewDiaryEntry) => void,
    message: string | undefined
}

const DiaryForm = ({ addDiary, message }: DiaryFormProps) => {
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
        {message && <div style={{color: "red"}}>{message}</div>}
        <form onSubmit={handleSubmit}>
            <label>
                date:{' '}
                <input type="date"
                name="date"
                value={date}
                onChange={({ target }) => setDate(target.value)}/>
            </label><br/>
            <RadioGroup 
                name="weather" 
                options={weatherOptions} 
                value={weather}
                setValue={setWeather}/>
            <RadioGroup 
                name="visibility"
                options={visibilityOptions}
                value={visibility}
                setValue={setVisibility}/>
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