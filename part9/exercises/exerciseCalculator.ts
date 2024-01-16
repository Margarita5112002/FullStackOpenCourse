import { all, isNumber } from "./utils"

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface Input {
    target: number,
    dailyExerciseHours: Array<number>
}

const getRatingDescription = (rating: number): string => {
    if (rating >= 3) {
        return 'great job'
    } else if (rating >= 2) {
        return 'not too bad but could be better'
    } else if (rating >= 1) {
        return 'you need to work harder'
    }
    return 'you need to put more effort'
}

const getAverage = (arr: Array<number>): number =>
    arr.length == 0 ? 0 :
        arr.reduce((b, curr) => b + curr, 0) / arr.length

const parseArguments = (args: Array<string>): Input => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (!all(isNumber, args.slice(2))){
        throw new Error('Provided arguments that are not numbers ...')
    }
    return {
        target: Number(args[2]),
        dailyExerciseHours: args.slice(3).map(a => Number(a))
    }
}

const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
    const average = getAverage(dailyExerciseHours)
    const rating = Math.floor((average / target) * 3)
    return {
        periodLength: dailyExerciseHours.length,
        trainingDays:
            dailyExerciseHours.reduce((b, curr) => curr == 0 ? b : b + 1, 0),
        success: average >= target,
        rating,
        ratingDescription: getRatingDescription(rating),
        target,
        average
    }
}

const {target, dailyExerciseHours} = parseArguments(process.argv)

console.log(calculateExercises(dailyExerciseHours, target))