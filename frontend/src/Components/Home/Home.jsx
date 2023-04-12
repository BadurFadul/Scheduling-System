import { useEffect, useState } from 'react';
import css from './Home.module.css'
import CourseServerice from '../../services/CourseServerice';
import ExamsService from '../../services/ExamsService';
import { Link } from 'react-router-dom'


const Home = () => {
    const [courses, setCourses] = useState([]);
    const [exams, setExams] = useState([]);

    //Getting courses
  useEffect(() => {
    CourseServerice.getAll().then(courses => setCourses(courses))
  },[])

  //Getting exams
  useEffect(() => {
    ExamsService.getAll().then(exams => setExams(exams))
  })

  // Get unique group names
  const groupNames = Array.from(
    new Set(courses.map((course) => course.group.name))
  );

  return (
    <div >
        <Link to="/">back</Link>
    <br/>
      {groupNames.map((group) => (
        <div key={group} className={css.tableWrapper}>
          <h2>{group}</h2>
          <table className={css.courseTable}>
            <thead>
              <tr>
                <th className={css.courseCode}>Course Code</th>
                <th className={css.courseName}>Course Name</th>
                <th className={css.sp}>SP</th>
                <th className={css.teacher}>Teacher</th>
                {Array.from({ length: 17 }, (_, i) => (
                  <th key={i}>W{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses
                .filter((course) => course.group.name === group)
                .map((course) => (
                  <tr key={course.code}>
                    <td className={css.courseCode}>{course.code}</td>
                    <td className={css.courseName}>{course.name}</td>
                    <td className={css.sp}>{course.sp}</td>
                    <td className={css.teacher}>{course.teacher}</td>
                    {Array.from({ length: 17 }, (_, i) => (
                      <td
                        key={i}
                        className={css.weekCell}
                      >
                        {/* Display exam data for the course in the corresponding week cell */}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default Home