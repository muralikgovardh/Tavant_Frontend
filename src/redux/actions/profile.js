import api from "../../utls/api";
import { setAlert } from "./alert";
import { ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, GET_REPOS, NO_REPOS, PROFILE_ERROR, UPDATE_PROFILE } from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// create-profile used to create a new profile.

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await api.post("/profile", formData);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "SUCCESS"));
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add experience
export const addExperience = (formData, history) => async(dispatch) => { 
  try{
      const res = await api.put("/profile/experience", formData);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience Added", "success"));
      history.push("./dashboard");
  }catch(err){
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

  }
};

//add education
export const addEducation = (formData, history) => async(dispatch) => { 
  try{
      const res = await api.put("/profile/education", formData);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education Added", "success"));
      history.push("./dashboard");
  }catch(err){
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

  }
};

export const deleteExperience = (id) => async(dispatch)=>{
  try {
    const res = await api.delete(`/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience removed", "success"))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

  }
};


export const deleteEducation = (id) => async(dispatch)=>{
  try {
    const res = await api.delete(`/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education removed", "success"))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

  }
};
export const deleteAccount = () => async(dispatch) => {
  if(window.confirm("Are you sure? This can NOT be undone!")){
    try {
      await api.delete("/profile");
      dispatch({ type: CLEAR_PROFILE});
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
  
    }
  }

};


export const getProfileById = (id) => async(dispatch) => {
  try {
    const res = await api.get(`/profile/user/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

  }

};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: NO_REPOS
    });
  }
};