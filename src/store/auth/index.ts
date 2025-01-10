import { AuthQueryReducer } from "./query";
import { authSliceReducer } from "./slice";

const AuthReducer = {
  ...AuthQueryReducer,
  ...authSliceReducer,
};

export * from "./slice";
export * from "./selectors";

export default AuthReducer;
