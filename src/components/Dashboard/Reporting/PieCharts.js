import React from 'react';
import { Card } from 'react-bootstrap';
import Chart from 'react-apexcharts';

const PieCharts = ({data}) => {

  const countNoShow = (status) => {
      var result = data.reduce(function (acc, cur) {
          return cur.check_in === status ? acc + 1 : acc;
      }, 0);
      return result;
  }

  const countStatus = (status) => {
    var result = data.reduce(function (acc, cur) {
        return cur.status === status ? acc + 1 : acc;
    }, 0);
    return result;
  }

  const countMealTypes = (data) => {
      // Function to determine meal type
      const getMealType = (time) => {
          const mealTime = new Date(`1970-01-01T${time}Z`).getUTCHours();
          return mealTime < 16 ? 'Öğle Yemeği' : 'Akşam Yemeği';
      };

      // Initialize counters for meal types
      let lunchCount = 0;
      let dinnerCount = 0;

      // Process each reservation
      data.forEach(reservation => {
          const mealType = getMealType(reservation.time);
          if (mealType === 'Öğle Yemeği') {
              lunchCount++;
          } else if (mealType === 'Akşam Yemeği') {
              dinnerCount++;
          }
      });

      // Return the counts as an object
      return {
          "noon": lunchCount,
          "evening": dinnerCount
      };
  };

  const options1 = {
    labels: ['İptal', 'Ağırlanan', 'NoShow'],
    colors: ['#FF6384', '#36A2EB', '#FFCE56'],
  };

  const series1 = [countStatus(String(5)), data.length, countNoShow(String(2))];

  const options2 = {
    labels: ['Akşam Yemeği', 'Öğle Yemeği'],
    colors: ['#36A2EB', '#FFCE56'],
  };

  var countMealTypesResult = countMealTypes(data);
  const series2 = [countMealTypesResult.evening, countMealTypesResult.noon];

  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Dağılımlar - Genel</Card.Title>
          <Chart options={options1} series={series1} type="pie" width="380" />
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Dağılımlar - Öğün</Card.Title>
          <Chart options={options2} series={series2} type="pie" width="380" />
        </Card.Body>
      </Card>
    </>
  );
};

export default PieCharts;
