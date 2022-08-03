import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => {
    const { data } = response;
    return data;
  });
};

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => {
    const { data } = response;
    return data;
  });
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => {
    return response;
  });
};

const updatePerson = (changedPerson) => {
  console.log("id:", changedPerson.id);
  console.log(`${baseUrl}/${changedPerson.id}`);
  return axios
    .put(`${baseUrl}/${changedPerson.id}`, changedPerson)
    .then((response) => {
      const { data } = response;
      console.log(response);
      return data;
    });
};
export default { getAll, createPerson, deletePerson, updatePerson };
