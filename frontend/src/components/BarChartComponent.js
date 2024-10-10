import React from 'react';
import Chart from 'react-apexcharts';

const BarChartComponent = ({ data }) => {
  const series = [{
    name: 'Requests',
    data: data.map(item => item.value),
  }];

  const options = {
    chart: {
      type: 'bar',
      height: '350',
      toolbar: { show: false },
      background: 'transparent',
    },
    xaxis: {
      categories: data.map(item => item.name),
      labels: {
        style: {
          colors: '#6B7280', // Grayish color for labels
          fontSize: '14px',
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '60%', // Adjust bar width
      },
    },
    colors: ['#4F46E5'], // Custom color for bars
    dataLabels: {
      enabled: false, // Disable data labels for cleaner look
    },
    grid: {
      show: true,
      borderColor: 'rgba(226, 232, 240, 0.5)', // Light gray grid lines
      strokeDashArray: 4,
    },
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', padding: '20px' }}>
      <h4 style={{ color: '#808080', marginBottom: '10px' }}>Number of request based on type</h4>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChartComponent;
