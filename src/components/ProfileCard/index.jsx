import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTags } from "../../redux/actions";
import "../../styles/profileCard.css";

export default function ProfileCard(props) {
  const [classCss, setClassCss] = useState({
    classCard: "cardProfile",
    classInfo: "information",
    viewGrades: "gradesHidden",
    infoState: "show",
  });
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  let firstName = props.student.firstName.toUpperCase();
  let lastName = props.student.lastName.toUpperCase();

  function handleKeyDownTags(event, studentId) {
    if (event.keyCode === 13) {
      let value = event.target.value;
      let studentTags = students.map((item) =>
        item.id === studentId
          ? {
              city: item.city,
              company: item.company,
              email: item.email,
              firstName: item.firstName,
              grades: item.grades,
              id: item.id,
              lastName: item.lastName,
              pic: item.pic,
              skill: item.skill,
              tags: [...item.tags, value],
            }
          : item
      );
      dispatch(addTags(studentTags));
    }
  }

  return (
    <div className={classCss.classCard}>
      <img src={props.student.pic} alt="Profile" className="imgProfile" />
      <div className={classCss.classInfo}>
        <h1>{`${firstName} ${lastName}`}</h1>
        <ul>
          <li key="email">Email: {props.student.email}.</li>
          <li key="company">Company: {props.student.company}.</li>
          <li key="skill">Skill: {props.student.skill}.</li>
          <li key="average">
            {`Average: 
                    ${(
                      props.student.grades.reduce(
                        (acc, n) => Number(acc) + Number(n)
                      ) / props.student.grades.length
                    ).toFixed(2)} %`}
          </li>
        </ul>
        <ul className={classCss.viewGrades}>
          {props.student.grades.map((grade, i) => {
            return <li key={`test${i}`}>{`Test ${i + 1}: ${grade}%`}</li>;
          })}
        </ul>
        <div className="tags">
          <span>
            {students
              .filter((item) => item.id === props.student.id)[0]
              ?.tags.map((tag) => {
                return (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                );
              })}
          </span>
        </div>
        <input
          placeholder="Add a tag"
          className="btnAddTag"
          onKeyDown={(event) => handleKeyDownTags(event, props.student.id)}
        />
        <hr />
      </div>
      {classCss.infoState === "show" ? (
        <div
          className="show"
          onClick={() =>
            setClassCss({
              classCard: "cardProfileFull",
              classInfo: "informationFull",
              viewGrades: "",
              infoState: "hidden",
            })
          }
        >
          +
        </div>
      ) : (
        <div
          className="hidden"
          onClick={() =>
            setClassCss({
              classCard: "cardProfile",
              classInfo: "information",
              viewGrades: "gradesHidden",
              infoState: "show",
            })
          }
        >
          -
        </div>
      )}
    </div>
  );
}
