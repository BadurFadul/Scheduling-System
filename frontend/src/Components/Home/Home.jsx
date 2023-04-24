import { useEffect, useState } from 'react';
import css from './Home.module.css'
import CourseServerice from '../../services/CourseServerice';
import ExamsService from '../../services/ExamsService';
import GroupService from '../../services/GroupService';
import { Link } from 'react-router-dom';



const Home = () => {
    const [courses, setCourses] = useState([]);
    const [exams, setExams] = useState([]);
    const [groups, setGroup] = useState([])
    const [filter, setFilter] = useState('');

    //Getting courses
  useEffect(() => {
    CourseServerice.getAll().then(courses => setCourses(courses))
  },[])

  //Getting exams
  useEffect(() => {
    ExamsService.getAll().then(exams => setExams(exams))
  },[])

    //Getting groups and their courses
    useEffect(() => {
      GroupService.getAll().then((group) => setGroup(group));
    }, []);


  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = days[d.getDay()];
    const formattedDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return `${dayName}, ${formattedDate}`;
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const showAllGroups = () => {
    setFilter('');
  };

  const filteredGroups = groups.filter((group) =>
  group.name.toLowerCase().startsWith(filter.toLowerCase()),
);


  return (
    <div className={css.wrapper}>
      <Link to="/">back</Link>
      <br />
      <div className={css.filterWrapper}>
        <label htmlFor="filter">Filter by group name:</label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          placeholder="e.g., ELA21"
        />
        <button onClick={showAllGroups}>Show All Groups</button>
      </div>
      {filteredGroups.map((group) => (
        <div key={group.groupId} className={css.tableWrapper}>
          <h2>{group.name}</h2>
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
              {group.courses.map((course) => (
                <tr key={course.code}>
                  <td className={css.courseCode}>{course.code}</td>
                  <td className={css.courseName}>{course.name}</td>
                  <td className={css.sp}>{course.sp}</td>
                  <td className={css.teacher}>{course.teacher}</td>
                  {Array.from({ length: 17 }, (_, i) => {
                    const exam = exams.find(
                      (exam) =>
                        exam.courseCode === course.code &&
                        getWeekNumber(exam.date) === i + 1,
                    );
                    return (
                      <td key={i} className={css.weekCell}>
                        {exam ? formatDate(exam.date) : ''}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Home