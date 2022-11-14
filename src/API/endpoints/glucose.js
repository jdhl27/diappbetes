import API from "../base";

class Glucose {
  PostGlucose = (glucoseData) => {
    return new API("glucose/").post(glucoseData);
  };
  GetAllGlucoses = (params = {}) => {
    return new API("glucose/").get(params);
  };
}

export default new Glucose();
