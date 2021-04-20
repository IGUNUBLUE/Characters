import axios from "axios";
import { GET_DATA, FILTER_DATA } from "./types";

export function getData() {
  return async function (dispatch) {
    const response = await axios.get(`https://api.hatchways.io/assessment/students`);
    dispatch({ type: GET_DATA, payload: response });
  };
}

export function filterData(payload) {
  return async function (dispatch) {
    dispatch({ type: FILTER_DATA, payload: payload });
  };
}
