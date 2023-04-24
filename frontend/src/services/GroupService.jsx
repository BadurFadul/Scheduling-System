import axios from "axios";

const url = "http://localhost:3000/groups";

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(url, config)
  return response.data;
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(url, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ url }/${id}`, newObject)
  return request.then(response => response.data)
}
const deleteId = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${url}/${id}`, config)
  return response.data
}

export default { getAll, create, update, setToken,deleteId }