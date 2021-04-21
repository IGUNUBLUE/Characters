import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, filterData } from "../../redux/actions";
import { autoCloseMessage } from "../../utils/alertMessages";
import ProfileCard from "../../components/ProfileCard";
import "../../styles/main.css";

function Main() {
  const dispatch = useDispatch();
  const [criteria, setCriteria] = useState({ name: "", tag: "" });
  const students = useSelector((state) => state.students);
  const filtered = useSelector((state) => state.filtered);

  //f5 case
  useEffect(() => {
    dispatch(getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch(event, input) {
    let inputValue = event.target.value;
    if (input === "name") {
      setCriteria({ ...criteria, name: inputValue });
    } else {
      setCriteria({ ...criteria, tag: inputValue });
    }

    if (inputValue === "" && criteria.tag === "") {
      dispatch(filterData([]));
    } else if (input === "name" && criteria.tag === "") {
      // eslint-disable-next-line array-callback-return
      let nameFilter = students.filter((student) => {
        let found = `${student.firstName.toLowerCase()}${student.lastName.toLowerCase()}`.includes(
          inputValue
        );
        if (found) {
          return student;
        }
      });
      if (nameFilter.length === 0) {
        autoCloseMessage(inputValue);
        event.target.value = "";
        dispatch(filterData([]));
      } else {
        dispatch(filterData(nameFilter));
      }
    } else if (input === "tag" && criteria.name !== "") {
      let tagFilter = filtered.filter((student) =>
        student.tags.join("").includes(inputValue)
      );
      if (tagFilter.length === 0){
        autoCloseMessage(inputValue);
        event.target.value = "";
        dispatch(filterData([]));
      } else {
        dispatch(filterData(tagFilter));
      }
    } else if (criteria.name === "" && input === "tag") {
      let tagFilter = students.filter((student) =>
        student.tags.join("").includes(inputValue)
      );
      if (tagFilter.length === 0){
        autoCloseMessage(inputValue);
        event.target.value = "";
        dispatch(filterData([]));
        setCriteria({...criteria, tag: ""})
      } else {
        dispatch(filterData(tagFilter));
      }
    }
  }

  return (
    <div className="bodyPage">
      <div className="search">
        <input
          id="searchName"
          type="text"
          placeholder="Search by name"
          onChange={(event) => handleSearch(event, "name")}
        />
      </div>
      <div className="searchTag">
        <input
          id="tagSearch"
          type="text"
          placeholder="Search by tag"
          onChange={(event) => handleSearch(event, "tag")}
        />
      </div>
      {students.length !== 0 ? (
        <div className="content">
          {filtered.length === 0
            ? students.map(function (student) {
                return <ProfileCard key={student.id} student={student} />;
              })
            : filtered.map(function (student) {
                return <ProfileCard key={student.id} student={student} />;
              })}
        </div>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
}

export default Main;
