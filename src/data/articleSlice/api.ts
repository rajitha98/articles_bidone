import axios from "axios";

export const fetchArticleApi = () => {
  return axios
    .get("/api/articles", {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
    .then((data) => data.data);
};
export const createArticleApi = (payload: any) => {
  return axios
    .post("/api/articles", payload, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
    .then((data) => data.data);
};
