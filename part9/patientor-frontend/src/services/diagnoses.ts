import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";

const getAll = async () => {
    const diagnoses = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    return diagnoses.data;
};

export default {
    getAll
};