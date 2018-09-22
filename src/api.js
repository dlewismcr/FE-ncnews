import axios from "axios";
const url = "https://dl-ncnews.herokuapp.com/api/";

const withErrorHandling = apiCallFn => {
  return (...args) =>
    apiCallFn(...args).catch(err => {
      let message;
      if (err.response.status === 400)
        message = "This was not a valid request for data!";
      if (err.response.status === 404)
        message = "There is no data at this location";
      if (err.response.status === 500)
        message = "Our network is down at this time, please try later";
      return { type: "error", message };
    });
};

export const fetchArticles = withErrorHandling(() => {
  return axios.get(`${url}articles`).then(({ data }) => {
    return data;
  });
});

export const fetchArticlesByTopic = withErrorHandling(topic => {
  return axios.get(`${url}topics/${topic}/articles`).then(({ data }) => {
    return data;
  });
});

export const getArticle = withErrorHandling(id => {
  return axios.get(`${url}articles/${id}`).then(({ data }) => {
    return data;
  });
});

export const getComments = withErrorHandling(id => {
  return axios.get(`${url}articles/${id}/comments`).then(({ data }) => {
    return data;
  });
});

export const changeArticleVote = withErrorHandling((articleId, direction) => {
  return axios
    .put(`${url}/articles/${articleId}?vote=${direction}`)
    .then(res => {
      return res.data.article;
    });
});

export const changeCommentVote = withErrorHandling((commentId, direction) => {
  return axios
    .put(`${url}/comments/${commentId}?vote=${direction}`)
    .then(res => {
      return res.data.comment;
    });
});

export const addComment = withErrorHandling(
  (articleId, commentBody, userId) => {
    const comment = { body: commentBody, created_by: userId };
    return axios
      .post(`${url}/articles/${articleId}/comments`, comment)
      .then(res => {
        return res.data.comment;
      });
  }
);

export const deleteComment = withErrorHandling(commentId => {
  return axios.delete(`${url}/comments/${commentId}`);
});

export const getUser = withErrorHandling(userName => {
  return axios.get(`${url}/users/${userName}`);
});

export const addArticle = withErrorHandling((topicSlug, title, body, user) => {
  const article = { title, body, created_by: user };
  return axios
    .post(`${url}/topics/${topicSlug}/articles`, article)
    .then(res => {
      return res.data.article;
    });
});
