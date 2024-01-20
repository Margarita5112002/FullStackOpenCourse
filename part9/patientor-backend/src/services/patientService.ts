import { v1 as uuid } from 'uuid';
import data from "../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";

const getPatients = () : NonSensitivePatient[] => {
    return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const getPatientById = (id: string): Patient | undefined => {
    return data.find(p => p.id === id);
};

const addPatient = (obj: NewPatient): Patient => {
    const newPatient = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: uuid(),
        ... obj
    };
    data.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient,
    getPatientById
};