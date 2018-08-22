import axios from "axios";
const url = "https://dl-ncnews.herokuapp.com/api/";

export function fetchArticles() {
  return axios.get(`${url}articles`).then(({ data }) => {
    return data;
  });
}
