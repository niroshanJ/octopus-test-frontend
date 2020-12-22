import React, { useState, useEffect } from 'react';
import Select from '../../components/select';
import Button from '../../components/button';
import BoxAndWhiskerChart from '../../components/box-whisker-chart';
import StudentsMarksChart from '../../components/student-marks-chart';
import { getData, getWhiskerChartData, getFilteredScores } from '../../services/http';
import loading from '../../imgs/loading.gif';

import './index.css';

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [grades, setGrades] = useState([]);
  const [years, setYears] = useState([]);
  const [whiskerChartLabels, setWhiskerChartLabels] = useState([]);
  const [whiskerChartScores, setWhiskerChartScores] = useState([]);
  const [individualStudentMarks, setIndividualStudentMarks] = useState([]);
  const [subjectAverage, setSubjectAverage] = useState([]);


  const [student, setStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [semester, setSemester] = useState('');
  const [mark, setMark] = useState('');
  const [grade, setGrade] = useState('');
  const [year, setYear] = useState('');


  useEffect(() => {
    // async function is made for call await in useEffect
    async function init() {
      setIsLoading(false);
      const data = await getData();
      setStudents(data.data.students);
      setSubjects(data.data.subjects);
      setMarks(data.data.mark);
      setSemesters(data.data.semester);
      setGrades(data.data.grade);
      setYears(data.data.years);
      console.log('getWhiskerChartData');
      const whiskerChartData = await getWhiskerChartData();
      console.log('gotWhiskerChartData');
      processWhiskerChartData(whiskerChartData);
      setIsLoading(true);
    }
    init();
  }, []);

  const processWhiskerChartData = (whiskerChartData) => {
    console.log(whiskerChartData.data, 'whiskerChartData');
    // breakdown data structure format for charts
    const subjectsLabels = [];
    const subjectScores = [];
    const averageScores = [];
    const individualStudentMarks = [];
    whiskerChartData.data.map((data, i) => {
      console.log(whiskerChartData.data, 'data');
      subjectsLabels.push(data.subject_name);
      subjectScores.push(data.scores);
      averageScores.push(data.averageCount);
      data.marks.map((value, markIndex) => {
        individualStudentMarks.push([i, value]);
      })
    });
    setIndividualStudentMarks(individualStudentMarks);
    setWhiskerChartLabels(subjectsLabels);
    setWhiskerChartScores(subjectScores);
    setSubjectAverage(averageScores);
    console.log(averageScores, 'averageScores');
  }

  const getFilteredStudentMarks = async () => {
    setIsLoading(false);
    const filters = {
      student,
      subject,
      semester,
      mark,
      grade,
      year
    };
    console.log('calling filtered data');
    const scores = await getFilteredScores(filters);
    console.log('received filtered data', scores);
    processWhiskerChartData(scores);
    setIsLoading(true);
  }

  const ShowBWChart = (props) => {
    if (props.isLoading) {
      return <BoxAndWhiskerChart labels={whiskerChartLabels} scores={whiskerChartScores} individualStudentMarks={individualStudentMarks} />;
    } else {
      return (
        <div className='text-center mt-5'>
          <img width='60' className='mx-auto d-block mb-1' src={loading} alt="fireSpot" />
              Loading...
        </div>
      );
    }
  }
  const ShowStudentsMarksChart = (props) => {
    if (props.isLoading) {
      return <StudentsMarksChart labels={whiskerChartLabels} scores={whiskerChartScores} individualStudentMarks={individualStudentMarks} subjectAverage={subjectAverage} />;
    } else {
      return (
        <div className='text-center mt-5'>
          <img width='60' className='mx-auto d-block mb-1' src={loading} alt="fireSpot" />
              Loading...
        </div>
      );
    }
  }
  return (
    <div className="row h-100">
      <div className="col-10 p-3 h-100">
        <h2 className='h4'>Octopus Test</h2>
        <p className='h6'>Only Box and Whisker chart and Average subject mark chart is done</p>
        <div className='row'>
          <div className='col p-3'>
            <ShowBWChart isLoading={isLoading} />
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <ShowStudentsMarksChart isLoading={isLoading} />
          </div>
        </div>
      </div>
      <div className="col-md-2 p-3 h-100 border-left">
        <h2 className='h4 mb-3'>Filters</h2>
        <div className='form-input-row'>
          <Select label='Student' data={students} column='name' onChange={(e) => { setStudent(e.currentTarget.value) }} />
        </div>
        <div className='form-input-row'>
          <Select label='Subject' data={subjects} column='subject' onChange={(e) => { setSubject(e.currentTarget.value) }} />
        </div>
        <div className='form-input-row'>
          <Select label='Mark' data={marks} column='mark' onChange={(e) => { setMark(e.currentTarget.value) }} />
        </div>
        <div className='form-input-row'>
          <Select label='Semester' data={semesters} column='semester' onChange={(e) => { setSemester(e.currentTarget.value) }} />
        </div>
        <div className='form-input-row'>
          <Select label='Grade' data={grades} column='grade' onChange={(e) => { setGrade(e.currentTarget.value) }} />
        </div>
        <div className='form-input-row'>
          <Select label='Years' data={years} column='year' onChange={(e) => { setYear(e.currentTarget.value) }} />
        </div>
        <div className='form-input-row'>
          <Button variant="primary" onClick={async () => { getFilteredStudentMarks() }} block>Generate</Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
