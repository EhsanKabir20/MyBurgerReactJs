import Axios from 'axios';

const AxiosInstance = Axios.create({
  baseURL: 'https://reactmyburgerdb.firebaseio.com/'
});

export default AxiosInstance;