import { BaseAuthApi } from "./BaseApi";

const postAuthUrl = "api/usa/auth";

const auth = (request) =>
  BaseAuthApi.post(postAuthUrl, request).then((response) => response.data);

export default {
  auth,
};
