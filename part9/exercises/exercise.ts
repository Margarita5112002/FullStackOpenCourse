export interface Result {
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
        return 'great job';
    } else if (rating >= 2) {
        return 'not too bad but could be better';
    } else if (rating >= 1) {
        return 'you need to work harder';
    }
    return 'you need to put more effort';
};

const getAverage = (arr: Array<number>): number =>
    arr.length == 0 ? 0 :
        arr.reduce((b, curr) => b + curr, 0) / arr.length;

const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {
    const average = getAverage(dailyExerciseHours);
    const rating = Math.floor((average / target) * 3);
    return {
        periodLength: dailyExerciseHours.length,
        trainingDays:
            dailyExerciseHours.reduce((b, curr) => curr == 0 ? b : b + 1, 0),
        success: average >= target,
        rating,
        ratingDescription: getRatingDescription(rating),
        target,
        average
    };
};

export default calculateExercises;