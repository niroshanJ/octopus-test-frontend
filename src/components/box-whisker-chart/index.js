import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import './index.css';

function BoxAndWhiskerChart(props) {

  HighchartsMore(Highcharts);
  const options = {
    chart: {
      type: 'boxplot'
    },
    title: {
      text: 'Student Marks'
    },
    legend: {
      enabled: false
    },
    xAxis: {
      categories: props.labels,
      title: {
        text: 'Subjects'
      }
    },
    yAxis: {
      title: {
        text: 'Marks'
      }
    },
    series: [
      {
        name: 'Subject',
        data: props.scores,
        tooltip: {
          headerFormat: '<strong>{point.key} <br/>{point.value}</strong>'
        }
      },
      {
        name: 'Marks',
        color: Highcharts.getOptions().colors[0],
        type:'scatter',
        data: props.individualStudentMarks,
        tooltip: {
          pointFormat: 'Marks: {point.y}'
        }
      }
    ]
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
}

export default BoxAndWhiskerChart;
