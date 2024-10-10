import React from 'react';
import Chart from 'react-apexcharts';

const PieChartComponent = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const series = data.map(item => item.value);
  const labels = data.map(item => item.name);

  const options = {
    chart: {
      type: 'donut',
      height: '350',
      background: 'transparent',
      toolbar: { show: false },
    },
    labels: labels,
    dataLabels: {
      enabled: false    ,
      formatter: (val, { seriesIndex }) => `${val} (${labels[seriesIndex]})`, // Custom label format
      style: {
        colors: ['#fff'], // White text color
        fontSize: '25px',
      },
    },
    colors: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
    ],
    plotOptions: {
      pie: {
        donut: {
          size: '60%', // Size of the donut hole
          background: 'transparent',
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: '#6B7280', // Grayish color for legend labels
      },
    },
  };

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', padding: '20px' }}>
        <h4 style={{ color: '#808080', marginBottom: '10px' }}>Number of request by Browsers</h4>
      <Chart options={options} series={series} type="donut" height={350} />
    </div>
  );
};

export default PieChartComponent;
