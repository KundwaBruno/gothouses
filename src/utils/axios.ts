import axios from "axios";

const { NEXT_PUBLIC_BASE_URL } = process.env;

export default axios.create({
  baseURL: NEXT_PUBLIC_BASE_URL,
});
