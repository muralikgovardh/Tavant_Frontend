import api from "../../utls/api";
import { setAlert } from "./alert";
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "./types";

export const loadUser = () => async (dispatch) => {
//   try {
//     const res = await api.get("/auth");
//     console.log(JSON.stringify(res.data));
//     dispatch({
//       type: USER_LOADED,
//       payload: res.data,
//     });
//     console.log(JSON.stringify(res.data));
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR,
//     });
//   }
 };
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/api/signup", formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
    //these errors we wamt to display using alert only
  }
};
export const login = (email, password) => async(dispatch) => {
  const body = { email, password };
  try{
    const res = await api.post('/login',body)
    dispatch({type: LOGIN_SUCCESS, payload: res.data});
    dispatch(loadUser());
  }catch(err){
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => ({ type: LOGOUT });