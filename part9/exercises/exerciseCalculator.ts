import { all, isNumber } from "./utils";
import calculateExercises from "./exercise";

interface Input {
    target: number,
    dailyExerciseHours: Array<number>
}

const parseArguments = (args: Array<string>): Input => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (!all(isNumber, args.slice(2))){
        throw new Error('Provided arguments that are not numbers ...');
    }
    return {
        target: Number(args[2]),
        dailyExerciseHours: args.slice(3).map(a => Number(a))
    };
};

const {target, dailyExerciseHours} = parseArguments(process.argv);

console.log(calculateExercises(dailyExerciseHours, target));