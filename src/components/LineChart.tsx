import React from 'react';
import { Line } from 'react-chartjs-2';  // Import the Line chart component from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useGetDepartmentRouteQuery } from '../features/DepartmentRouteApi';

// Registering the necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const { data, isLoading, isError } = useGetDepartmentRouteQuery()
  const department = [];

  data?.map((item, index) => {
    department.push(item.depr_rout.substring(0,10).concat('...'))
  })


  const departmentcount = [];
  data?.map((item, index) => {
    departmentcount.push(item.count)
  })

  console.log("brijesh department===", department);
  console.log("brijesh department coutn", departmentcount);




  console.log("brijesh departhment rout", data);
  // Data for the line chart
  const data1 = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    labels: department,
    datasets: [
      {
        label: 'Department over requests',  // Label for the line
        // data: [65, 59, 80, 81, 56, 55, 40],  // Data for the line (y values)
        data: departmentcount,  // Data for the line (y values)
        fill: false,  // Do not fill under the line
        borderColor: 'rgba(75, 192, 192, 1)',  // Line color
        tension: 0.1,  // Line tension (smoothness)
        pointRadius: 5,  // Size of the points
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',  // Color of the points
        borderWidth: 2,  // Line width
      },
    ],
  };

  // Options for customizing the chart
  const options = {
    responsive: true,  // Make the chart responsive
    plugins: {
      title: {
        display: true,
        text: 'Count of Top 10 Departments by Application ',
      },
      tooltip: {
        callbacks: {
          // Customize the tooltip label
          label: function (context) {
            return `Count: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Department',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Requests',  // y-axis label
        },
        beginAtZero: true,  // Start the y-axis from 0
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: 'auto', padding: '50px 0' }}>
      <Line data={data1} options={options} />  {/* Render the Line chart */}
    </div>
  );
};

export default LineChart;
