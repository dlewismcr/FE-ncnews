import axios from "axios";
const url = "https://dl-ncnews.herokuapp.com/api/";

export const fetchArticles = () => {
  return axios.get(`${url}articles`).then(({ data }) => {
    return data;
  });
};

export const fetchArticlesByTopic = topic => {
  return axios.get(`${url}topics/${topic}/articles`).then(({ data }) => {
    return data;
  });
};

export const getArticle = id => {
  return axios.get(`${url}articles/${id}`).then(({ data }) => {
    return data;
  });
};

export const getComments = id => {
  return axios.get(`${url}articles/${id}/comments`).then(({ data }) => {
    return data;
  });
};

export const changeArticleVote = (articleId, direction) => {
  return axios
    .put(`${url}/articles/${articleId}?vote=${direction}`)
    .then(res => {
      return res.data.article;
    });
};

export const changeCommentVote = (commentId, direction) => {
  return axios
    .put(`${url}/comments/${commentId}?vote=${direction}`)
    .then(res => {
      return res.data.comment;
    });
};
