import axios from 'axios';
// npm install axios

class ApiService {
  static api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  static async getCharacters(params) {
    return await this.api.get('character/', {
      params
    })
  }
}

export { ApiService };
