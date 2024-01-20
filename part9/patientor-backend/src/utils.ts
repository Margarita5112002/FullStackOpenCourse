import { Gender, NewPatient } from "./types";

const isString = (value: unknown): value is string => {
    return typeof value === "string" || value instanceof String;
};

const parseString = (value: unknown, paramName: string): string => {
    if (!isString(value)) {
        throw new Error(`incorrect or missing ${paramName}`);
    }
    return value;
};

const isDate = (value: string): boolean => {
    return Boolean(Date.parse(value));
};

const parseDateOfBirth = (value: unknown): string => {
    if (!isString(value) || !isDate(value)) {
        throw new Error('incorrect or missing date of birth');
    }
    return value;
};

const isGender = (value: string): value is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(value);
};

const parseGender = (value: unknown): Gender => {
    if (!isString(value) || !isGender(value)){
        throw new Error('incorrect or missing gender');
    }
    return value;
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('incorrect or missing data');
    }

    if ('name' in object && 
        'dateOfBirth' in object && 
        'ssn' in object && 
        'gender' in object && 
        'occupation' in object) {
        return {
            name: parseString(object.name, 'name'),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseString(object.ssn, 'ssn'),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation, 'occupation'),
            entries: []
        };
    }

    throw new Error('missing parameters');
};

export default toNewPatient;