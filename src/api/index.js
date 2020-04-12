import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
	try {
		const response = await axios.get(url);
		if (response.status !== 200)
			throw new Error('failed to fetch data', response.status);
		const { confirmed, recovered, deaths, lastUpdate } = response.data;
		const cardCovidData = { confirmed, recovered, deaths, lastUpdate };

		return cardCovidData;
	} catch (err) {
		console.log(err);
	}
};

export const fetchDailyData = async () => {
	try {
		const response = await axios.get(`${url}/daily`);
		if (response.status !== 200)
			throw new Error('failed to fetch data', response.status);
		const modifiedData = response.data.map((dailyData) => ({
			confirmed: dailyData.confirmed.total,
			deaths: dailyData.deaths.total,
			date: dailyData.reportDate,
		}));
		console.log(response.data);

		return modifiedData;
	} catch (err) {
		console.log(err);
	}
};
