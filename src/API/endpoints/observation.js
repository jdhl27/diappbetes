import API from "../base";

class Observation {
  PostObservation = (data) => {
    return new API("observation/").post(data);
  };
  GetAllObservations = (params = {}) => {
    return new API("observation/").get(params);
  };
}

export default new Observation();
