import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, filterData } from "../../redux/actions";
import { autoCloseMessage } from "../../utils/alertMessages";
import ProfileCard from "../../components/ProfileCard";
import "../../styles/main.css";

function Main() {
  const dispatch = useDispatch();
  let data = useSelector((state) => state.apiResponse.data);
  let filtered = useSelector((state) => state.filtered.data);

  //f5 case
  useEffect(() => {
    dispatch(getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch(event) {
    let inputValue = event.target.value;
    if (inputValue === "") {
      dispatch(getData());
      dispatch(filterData([]));
    } else {
      // eslint-disable-next-line array-callback-return
      let students = data.students.filter(function (student) {
        let found = `${student.firstName.toLowerCase()}${student.lastName.toLowerCase()}`.includes(
          inputValue
        );
        if (found) {
          return student;
        }
      });
      if (students.length === 0) {
        autoCloseMessage(inputValue);
        event.target.value = "";
        dispatch(filterData([]));
      } else {
        dispatch(filterData(students));
      }
    }
  }

  return (
    <div className="bodyPage">
      <div className="search">
        <input
          type="text"
          placeholder="Search by name"
          onChange={(event) => handleSearch(event)}
        />
      </div>
      {data ? (
        <div className="content" id="content">
          {filtered.students.length === 0
            ? data.students.map(function (student) {
                return <ProfileCard student={student} />;
              })
            : filtered.students.map(function (student) {
                return <ProfileCard student={student} />;
              })}
        </div>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
}

export default Main;
