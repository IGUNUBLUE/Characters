import "../../styles/profileCard.css";

export default function ProfileCard(props) {
  let firstName = props.student.firstName.toUpperCase();
  let lastName = props.student.lastName.toUpperCase();

  
  return (
    <div className="cardProfile">
      <img src={props.student.pic} alt="Profile" className="imgProfile" />
      <div className="information">
        <h1>{`${firstName} ${lastName}`}</h1>
        <ul>
          <li>Email: {props.student.email}.</li>
          <li>Company: {props.student.company}.</li>
          <li>Skill: {props.student.skill}.</li>
          <li>
            {`Average: 
                    ${(
                      props.student.grades.reduce(
                        (acc, n) => Number(acc) + Number(n)
                      ) / props.student.grades.length
                    ).toFixed(2)} %`}
          </li>
        </ul>
      </div>
      <div className="add">+</div>
    </div>
  );
}
