import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getById = async (id: string) => {
    try {
        const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        return data;
    } catch(error: unknown) {
        console.error(`something went wrong fetching patient with ${id} id`);
        if (axios.isAxiosError(error)) {
            console.error(error.message);
        }
    }
};

export default {
  getAll, create, getById
};