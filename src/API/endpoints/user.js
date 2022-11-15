import API from "../base";

class User {
  PostUserRegister = (userData) => {
    return new API("signup/").post(userData);
  };

  PostUserLogin = (userData) => {
    return new API("signin/").post(userData);
  };

  GetUsers = (params = {}) => {
    return new API("users/").get(params);
  };

  GetUser = (params = {}) => {
    return new API("user/").get(params);
  };

  GetUserId = (params = {}) => {
    return new API("userId/").get(params);
  };

  GetPatient = (params = {}) => {
    return new API("patients/").get(params);
  };
}

export default new User();
