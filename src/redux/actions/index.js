import axios from "axios";
import { GET_DATA, FILTER_DATA, ADD_TAGS } from "./types";

export function getData() {
  return async function (dispatch) {
    const response = await axios.get(
      `https://api.hatchways.io/assessment/students`
    );
    const moreTags = await response.data.students.map((item) => {
      return {
        city: item.city,
        company: item.company,
        email: item.email,
        firstName: item.firstName,
        grades: item.grades,
        id: item.id,
        lastName: item.lastName,
        pic: item.pic,
        skill: item.skill,
        tags: [],
      };
    });
    dispatch({ type: GET_DATA, payload: moreTags });
  };
}

export function filterData(payload) {
  return async function (dispatch) {
    dispatch({ type: FILTER_DATA, payload: payload });
  };
}

export function addTags(payload) {
  return async function (dispatch) {
    dispatch({ type: ADD_TAGS, payload: payload });
  };
}
