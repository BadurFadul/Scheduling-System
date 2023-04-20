import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Examform = ({courses, HandleExam, date, onClose }) => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [examDate, setExamDate] = useState('');

  return (
    <div>
        <h2>Add Exam</h2>
        <form onSubmit={HandleExam}>
            <div>
                <label htmlFor="courseCode">Course Code:</label>
                <select
                    id="courseCode"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                    <option key={course.code} value={course.code}>
                        {course.code}
                    </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="examDate">Exam Date:</label>
                <DatePicker
                    selected={examDate}
                    onChange={(date) => setExamDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
            </div>
            <button type="button">
            Close
            </button>
            <button type="submit">Add Exam</button>
        </form>
    </div>
  )
}

export default Examform