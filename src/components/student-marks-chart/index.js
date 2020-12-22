import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import './index.css';

function StudentsMarksChart(props) {

  HighchartsMore(Highcharts);
  const options = {
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: 'Average Subject Marks'
    },
    xAxis: [{
      categories: props.labels,
      crosshair: true
    }],
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}°C',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      title: {
        text: 'Marks Average',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      }
    }, { // Secondary yAxis
      title: {
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      labels: {
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      },
      opposite: true
    }],
    tooltip: {
      shared: true
    },
    series: [{
      name: 'Subject',
      type: 'column',
      yAxis: 1,
      data: props.subjectAverage
    }]
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

export default StudentsMarksChart;
