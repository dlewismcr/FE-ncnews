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

export const addComment = (articleId, commentBody, userId) => {
  const comment = { body: commentBody, created_by: userId };
  return axios
    .post(`${url}/articles/${articleId}/comments`, comment)
    .then(res => {
      return res.data.comment;
    });
};

export const deleteComment = commentId => {
  return axios.delete(`${url}/comments/${commentId}`);
};

export const getUser = userName => {
  return axios.get(`${url}/users/${userName}`);
};

export const addArticle = (topicSlug, title, body, user) => {
  console.log("api.addarticle- user, need id", user);
  const article = { title, body, created_by: user };
  return axios
    .post(`${url}/topics/${topicSlug}/articles`, article)
    .then(res => {
      return res.data.article;
    });
};

// ```http
// POST /api/topics/:topic_slug/articles
// ```
// ```
// Add a new article to a topic.This route requires a JSON body with title and body key value pairs
// e.g: `{ "title": "new article", "body": "This is my new article content"}`
// ```
