import React, { FunctionComponent, useEffect, useState } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.scss';

interface CovidDataNestObjectType {
	value: number
}

type ChartsProps = {
	country: string,
	covidData: {
		[key: string] : CovidDataNestObjectType,
	}
}

interface DailyDataObjectType {
	date: string,
	confirmed: number,
	deaths: number
}

const Charts: FunctionComponent<ChartsProps> = ({ covidData, country }) => {

	const [dailyData, setDailyData] = useState<Array<DailyDataObjectType>>([]);

	console.log(covidData);

	const { confirmed, deaths, recovered } = covidData;

	useEffect(() => {
		const fetchAPI = async () => {
			setDailyData(await fetchDailyData());
		};

		fetchAPI();
	}, []);

	const lineChart = dailyData.length ? (
		<Line
			data={{
				labels: dailyData.map(({ date }) => date),
				datasets: [
					{
						data: dailyData.map(({ confirmed }) => confirmed),
						label: 'Confirmed',
						borderColor: '#3333ff',
						fill: true,
					},
					{
						data: dailyData.map(({ deaths }) => deaths),
						label: 'Deaths',
						borderColor: 'red',
						backgroundColor: 'rgba(255, 0, 0, 0.5)',
						fill: true,
					},
				],
			}}
		/>
	) : null;

	const barChart = confirmed ? (
		<Bar
			data={{
				labels: ['Confirmed', 'Recovered', 'Deaths'],
				datasets: [
					{
						label: 'People',
						backgroundColor: [
							'rgba(0, 0, 255, 0.5)',
							'rgba(0, 255, 0, 0.5)',
							'rgba(250, 0, 0, 0.5)',
						],
						data: [confirmed.value, recovered.value, deaths.value],
					},
				],
			}}
			options={{
				legend: { display: false },
				title: { display: true, text: `Current state in ${country}` },
			}}
		/>
	) : null;

	return (
		<div className={styles.container}>{country ? barChart : lineChart}</div>
	);
};

export default Charts;
