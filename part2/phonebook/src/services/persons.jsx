import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const createPerson = (person) => {
  return axios.post(baseUrl, person).then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, modifiedPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, modifiedPerson)
    .then((response) => response.data);
};

export default { getAll, createPerson, deletePerson, update };
