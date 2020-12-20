import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-myburger-a0293.firebaseio.com/",
});
export default instance;
