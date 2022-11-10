import { UPDATE_USER } from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case UPDATE_USER:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
