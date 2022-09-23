import { apiUrl } from "../../config/constants";
import axios from "axios";
import {
  startLoadingSpace,
  spaceFullyFetched,
  doneLoadingSpace,
} from "./slice";

export const fetchSpaces = () => async (dispatch, getState) => {
  try {
    dispatch(startLoadingSpace());

    const response = await axios.get(`${apiUrl}/spaces`); // => Promise

    console.log("responses", response);

    dispatch(
      spaceFullyFetched({
        space: response.data.data,
      })
    );
    dispatch(doneLoadingSpace());

    // send them to the slice
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchOneSpace = (id) => async (dispatch, getState) => {
  try {
    dispatch(startLoadingSpace(id));
    const response = await axios.get(`${apiUrl}/spaces/${id}`); // => Promise

    console.log("responses", response);

    dispatch(
      spaceFullyFetched({
        space: response.data.data,
      })
    );
    dispatch(doneLoadingSpace());

    // send them to the slice
  } catch (e) {
    console.log(e.message);
  }
};
