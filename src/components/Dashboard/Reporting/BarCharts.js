import React from 'react';
import { Card } from 'react-bootstrap';
import Chart from 'react-apexcharts';


const processData = (data) => {
  // Function to determine meal type
  const getMealType = (time) => {
    const mealTime = new Date(`1970-01-01T${time}Z`).getUTCHours();
    return mealTime < 16 ? 'Öğle Yemeği' : 'Akşam Yemeği';
  };

  // Initialize counters for each month
  const monthlyData = {
    '01': { "Öğle Yemeği": 0, "Akşam Yemeği": 0 },
    '02': { "Öğle Yemeği": 0, "Akşam Yemeği": 0 },
    '03': { "Öğle Yemeği": 0, "Akşam Yemeği": 0 },
    '04': { "Öğle Yemeği": 0, "Akşam Yemeği": 0 },
    '05': { "Öğle Yemeği": 0, "Akşam Yemeği": 0 },
    '06': { "Öğle Yemeği": 0, "Akşam Yemeği": 0 },
    '07': { "Öğle Yemeği": 0, "Akşam Yemeği": 0 },
    '08': { "Öğle Yemeği": 0, "Akşam Yemeği": 0 },
    '09': { "Öğle Yemeği": 0, "Akşam Yemeği": 0 },
    '10': { "Öğle Yemeği": 0, "Akşam Yemeği": 0 },
    '11': { "Öğle Yemeği": 0, "Akşam Yemeği": 0 },
    '12': { "Öğle Yemeği": 0, "Akşam Yemeği": 0 },
  };

  // Process each reservation
  data.forEach(reservation => {
    const month = reservation.date.split('-')[1];  // Get the month part of the date
    const mealType = getMealType(reservation.time);
    if (mealType === 'Öğle Yemeği') {
      monthlyData[month]["Öğle Yemeği"]++;
    } else if (mealType === 'Akşam Yemeği') {
      monthlyData[month]["Akşam Yemeği"]++;
    }
  });

  // Prepare data for the chart
  const lunchData = [];
  const dinnerData = [];
  const categories = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

  Object.keys(monthlyData).sort().forEach(month => {
    lunchData.push(monthlyData[month]["Öğle Yemeği"]);
    dinnerData.push(monthlyData[month]["Akşam Yemeği"]);
  });

  return { categories, lunchData, dinnerData };
};

const BarCharts = ({ data }) => {
  const { categories, lunchData, dinnerData } = processData(data);

  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: categories,
    },
  };

  const series = [
    {
      name: 'Öğle',
      data: lunchData,
    },
    {
      name: 'Akşam',
      data: dinnerData,
    },
  ];

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Misafirler</Card.Title>
        <Chart options={options} series={series} type="bar" width="100%" />
      </Card.Body>
    </Card>
  );
};

export default BarCharts;
