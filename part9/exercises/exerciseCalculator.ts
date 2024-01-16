interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
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

const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
    const average = dailyExerciseHours.length == 0 ? 0 :
        dailyExerciseHours
            .reduce((b, curr) => b + curr, 0) / dailyExerciseHours.length
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
console.log(calculateExercises([], 2))
console.log(calculateExercises([0, 0, 0], 2))
console.log(calculateExercises([1, 2, 0, 3, 0, 0, 1, 1, 2, 0], 3))
console.log(calculateExercises([12, 6, 2, 5, 5], 6))