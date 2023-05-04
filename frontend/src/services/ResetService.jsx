import axios from 'axios'
const baseUrl = 'http://localhost:3000/users/reset-password'

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  }
export default { create }