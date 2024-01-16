import { isNumber } from "./utils"
import calculateBmi from "./bmi"

interface MultipleValues {
    value1: number,
    value2: number
}

const parseArguments = (args: Array<string>): MultipleValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if (!isNumber(args[2]) || !isNumber(args[3])){
        throw new Error('Provided arguments that are not numbers ...')
    }

    return {
        value1: Number(args[2]),
        value2: Number(args[3])
    }
}

const {value1, value2} = parseArguments(process.argv)

console.log(calculateBmi(value1, value2))