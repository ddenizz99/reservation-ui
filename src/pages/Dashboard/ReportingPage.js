import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import GeneralStats from '../../components/Dashboard/Reporting/GeneralStats';
import PieCharts from '../../components/Dashboard/Reporting/PieCharts';
import BarCharts from '../../components/Dashboard/Reporting/BarCharts';
import DataTable from '../../components/Dashboard/Reporting/DataTable';

import { getByRestaurantIdMain } from "../../services/ReservationService";

const ReportingPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [reservationData, setReservationData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true);
            setError('');
  
            await getByRestaurantIdMain()
              .then(result => {
                  if(result.success){
                      setReservationData(result.data);
                  }else{
                      setError(result.message);
                  }
              }).catch(result => {
                  setError(String(result));
              });
            setIsLoading(false);
        };

        fetchData();

      }, []); 

    /* const summarizeReservations = (data) => {
        // Function to determine meal type
        const getMealType = (time) => {
            const mealTime = new Date(`1970-01-01T${time}Z`).getUTCHours();
            return mealTime < 16 ? 'Öğle Yemeği' : 'Akşam Yemeği';
        };
    
        // Create a summary object to store the summary data
        const summary = {};
    
        // Process each reservation
        data.forEach(reservation => {
            const date = new Date(reservation.date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', weekday: 'long' });
            const mealType = getMealType(reservation.time);
            if (!summary[date]) {
                summary[date] = { "Öğle Yemeği": 0, "Akşam Yemeği": 0, "Toplam": 0 };
            }
            summary[date][mealType]++;
            summary[date].Toplam++;
        });
    
        // Convert the summary object to an array and calculate percentages
        return Object.keys(summary).map(date => {
            const lunchCount = summary[date]["Öğle Yemeği"];
            const dinnerCount = summary[date]["Akşam Yemeği"];
            const totalCount = summary[date].Toplam;
            const lunchPercentage = totalCount > 0 ? (lunchCount / totalCount * 100).toFixed(2) : 0;
            const dinnerPercentage = totalCount > 0 ? (dinnerCount / totalCount * 100).toFixed(2) : 0;
            return {
                "day": date,
                "noon": `${lunchCount} (%${lunchPercentage})`,
                "evening": `${dinnerCount} (%${dinnerPercentage})`,
                "total": totalCount
            };
        });
    }; */

    const summarizeReservations = (data) => {
        // Function to determine meal type
        const getMealType = (time) => {
            const mealTime = new Date(`1970-01-01T${time}Z`).getUTCHours();
            return mealTime < 16 ? 'Öğle Yemeği' : 'Akşam Yemeği';
        };
    
        // Function to process data and create summaries
        const processSummary = (data, groupBy) => {
            const summary = {};
    
            data.forEach(reservation => {
                let key;
                if (groupBy === 'date') {
                    key = new Date(reservation.date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', weekday: 'long' });
                } else if (groupBy === 'month') {
                    key = new Date(reservation.date).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
                } else if (groupBy === 'year') {
                    key = new Date(reservation.date).getFullYear();
                }
    
                const mealType = getMealType(reservation.time);
                if (!summary[key]) {
                    summary[key] = { "Öğle Yemeği": 0, "Akşam Yemeği": 0, "Toplam": 0 };
                }
                summary[key][mealType]++;
                summary[key].Toplam++;
            });
    
            return Object.keys(summary).map(key => {
                const lunchCount = summary[key]["Öğle Yemeği"];
                const dinnerCount = summary[key]["Akşam Yemeği"];
                const totalCount = summary[key].Toplam;
                const lunchPercentage = totalCount > 0 ? (lunchCount / totalCount * 100).toFixed(2) : 0;
                const dinnerPercentage = totalCount > 0 ? (dinnerCount / totalCount * 100).toFixed(2) : 0;
                return {
                    "day": key,
                    "noon": `${lunchCount} (%${lunchPercentage})`,
                    "evening": `${dinnerCount} (%${dinnerPercentage})`,
                    "total": totalCount
                };
            });
        };
    
        // Daily summary
        const dailySummary = processSummary(data, 'date');
    
        // Monthly summary
        const monthlySummary = processSummary(data, 'month');
    
        // Yearly summary
        const yearlySummary = processSummary(data, 'year');
    
        return {
            dailySummary,
            monthlySummary,
            yearlySummary
        };
    };

    const summaries = summarizeReservations(reservationData);

    return (

        [
            !reservationData || isLoading ? (
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', padding:30}}>
                    <Spinner animation="border" />
                </div>
            ) : error ? (
                <h3 className='text-danger'>{error}</h3>
            ) : (<Container fluid>
                <Row>
                    <Col>
                    <GeneralStats reservationData={reservationData} />
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                    <PieCharts data={reservationData} />
                    </Col>
                    <Col md={8}>
                    <BarCharts data={reservationData}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DataTable mainTitle="Günlük" subTitle="Gün" data={summaries.dailySummary} />
                        <DataTable mainTitle="Aylık" subTitle="Ay" data={summaries.monthlySummary} />
                        <DataTable mainTitle="Yıllık" subTitle="Yıl" data={summaries.yearlySummary} />
                    </Col>
                </Row>
            </Container>)
        ]
    );

};

export default ReportingPage;