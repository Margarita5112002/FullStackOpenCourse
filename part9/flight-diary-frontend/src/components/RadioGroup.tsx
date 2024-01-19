interface RadioGroupProps {
    value: string,
    setValue: (arg: string) => void,
    options: string[],
    name: string
}

const RadioGroup = ({value, setValue, options, name}: RadioGroupProps) => {
    return <div>
        {options.map(o => 
            <label key={o}>
                <input 
                    name={name} 
                    type="radio" 
                    value={o}
                    onChange={({target}) => setValue(target.value)}
                    checked={value === o}/>{o}
            </label>)}
    </div>
}

export default RadioGroup