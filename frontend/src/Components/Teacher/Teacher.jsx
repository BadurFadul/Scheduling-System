import { useState, useEffect } from 'react'
import css from './Teacher.module.css'
import CourseServerice from '../../services/CourseServerice'
import ExamsService from '../../services/ExamsService'
import { Link } from 'react-router-dom'



const Teacher = ({user}) => {
    const [courses, setCourses] = useState([]);
    const [exams, setExams] = useState([]);
    const [selectedWeekDates, setSelectedWeekDates] = useState([]);
    const [showSelectedWeekDates, setShowSelectedWeekDates] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCourseCode, setSelectedCourseCode] = useState('');
    const [selectedExamId, setSelectedExamId] = useState('');
    const [formMode, setFormMode] = useState(null);

    //Getting courses
  useEffect(() => {
    CourseServerice.getAll().then(courses => setCourses(courses))
  },[])

  //Getting exams
  useEffect(() => {
    ExamsService.getAll().then(exams => setExams(exams))
  },[])

   // Filter the courses based on the user.name and course.users.name
   const filteredCourses = courses.filter((course) =>
   course.users.some((courseUser) => courseUser.name === user.name)
 );

 // Get unique group names
 const groupNames = Array.from(
   new Set(filteredCourses.map((course) => course.group.name))
 );

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

const getWeekDates = (weekNumber) => {
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() + 3 - (startOfWeek.getDay() + 6) % 7);
  const week1 = new Date(startOfWeek.getFullYear(), 0, 4);
  const startDate = new Date(week1.getTime() + (weekNumber - 1) * 7 * 86400000);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate.getTime() + i * 86400000);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    dates.push(formattedDate);
  }
  return dates;
};

//create exam
const handleExam = async (event) => {
  event.preventDefault();
  const Obj = {
    date: selectedDate,
    courseId: selectedCourseCode
  };

  try {
    if (formMode === 'add') {
      await ExamsService.create(Obj);
    } else if (formMode === 'update') {
      await ExamsService.update(selectedExamId, Obj);
    }
    // Refresh exams data after creating or updating
    ExamsService.getAll().then((exams) => setExams(exams));
    setShowSelectedWeekDates(false);
    setFormMode(null);
  } catch (error) {
    console.error("Error handling exam", error);
    return false;
  }
};

//delete exam
const deleteExam = async () => {
  try {
    await ExamsService.deleteId(selectedExamId);
    // Refresh exams data after deleting
    ExamsService.getAll().then((exams) => setExams(exams));
    setSelectedExamId('');
    setShowSelectedWeekDates(false);
    setFormMode(null);
  } catch (error) {
    console.error("Error deleting exam", error);
    return false;
  }
};


  return (
    <div className={css.wrapper}>
      <br />
    <h1>Courses for {user? user.name: null}</h1>
    <br/>
    <Link to="/">back</Link>
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
            {filteredCourses
              .filter((course) => course.group.name === group)
              .map((course) => (
                <tr key={course.code}>
                  <td className={css.courseCode}>{course.code}</td>
                  <td className={css.courseName}>{course.name}</td>
                  <td className={css.sp}>{course.sp}</td>
                  <td className={css.teacher}>{course.teacher}</td>
                  {Array.from({ length: 17 }, (_, i) => {
              const exam = exams.find(
                (exam) => exam.courseCode === course.code && getWeekNumber(exam.date) === i + 1
              );
              return (
                <td
                    key={i}
                    onClick={() => {
                      setSelectedWeekDates(getWeekDates(i + 1));
                      setSelectedCourseCode(course.code);
                      if (exam) {
                        setSelectedExamId(exam.id);
                        setSelectedDate(exam.date);
                        setFormMode('update');
                      } else {
                        setSelectedExamId('');
                        setSelectedDate('');
                        setFormMode('add');
                      }
                    }}
                    className={css.weekCell}
                  >
                  {exam ? formatDate(exam.date) : ''}
                </td>
              );
            })}
                </tr>
              ))}
          </tbody>
        </table>
        {formMode && (
  <form onSubmit={handleExam} className={css.formWrapper}>
    <h2>Selected Week Dates:</h2>
    <div>
      <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        <option value="" disabled>
          Select a date
        </option>
        {selectedWeekDates.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
    <div className={css.buttonContainer}>
      {formMode === 'add' && <button type="submit">Add Exam</button>}
      {formMode === 'update' && (
        <>
          <button type="submit">Update Exam</button>
          <button onClick={deleteExam} type="button" className={css.delete}>
            Delete Exam
          </button>
        </>
      )}
      <button onClick={() => {setShowSelectedWeekDates(false); setFormMode(null);}} className={css.cancel}>Cancel</button>
    </div>
  </form>
)}
      </div>
    ))}
  </div>
  )
}

export default Teacher