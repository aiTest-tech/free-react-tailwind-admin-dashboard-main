//@ts-nocheck
import { Bar } from 'react-chartjs-2';  // Import the Bar chart component from react-chartjs-2
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { useGetTypeDistributionApiQuery } from '../features/Typedistribution';
import Loader from '../common/Loader';

// Register ChartJS components to use them
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    const { data, isLoading, isError } = useGetTypeDistributionApiQuery()
    const importantdata = [];
    data?.map((element, index) => {
        importantdata.push(element.count);
    })
    console.log("brijesh imp data", importantdata);
    importantdata.push()
    console.log("brijesh data", data);
    // Data for the bar chart
    const data1 = {
        labels: ['Grievance', 'Appointment', 'Wishes', 'Suggestion'],  // x-axis labels
        datasets: [
            {
                label: 'Count of Applications',  
                // data: [12, 19, 3, 5],  // Data for the bars
                data: importantdata,  // Data for the bars
                // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                backgroundColor: '#199898',
                // borderColor: 'rgba(75, 192, 192, 1)',  // Border color for the bars
                borderColor: '#34315c',  // Border color for the bars
                borderWidth: 1,  // Border width
            },
        ],
    };

    // Options for the chart to customize its appearance
    const options = {
        responsive: true,  // Make the chart responsive
        plugins: {
            title: {
                display: true,
                text: '',  // Chart title
            },
            tooltip: {
                callbacks: {
                    // Optional: Customize tooltips
                    label: function (context) {
                        return `Count ${context.raw}`;  // Format the tooltip label
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '',  // x-axis label
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Count of Application',  // y-axis label
                },
                beginAtZero: true,  // Start the y-axis from zero
            },
        },
    };

    if (isLoading) return <div><Loader /></div>;
    if (isError) return <div>Error fetching data</div>;

    return (
        <div style={{ width: '80%', margin: 'auto', padding: '50px 0' }}>
            <Bar data={data1} options={options} />  {/* Render the Bar chart */}
        </div>
    );
};

export default BarChart;
