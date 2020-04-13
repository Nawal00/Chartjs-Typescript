import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
	// if there is a country change url
	let urlVariant = country ? `${url}/countries/${country}` : url;

	try {
		const response = await axios.get(urlVariant);
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

		return modifiedData;
	} catch (err) {
		console.log(err);
	}
};

export const fetchCountries = async () => {
	try {
		const response = await axios.get(`${url}/countries`);
		if (response.status !== 200)
			throw new Error('failed to fetch data', response.status);
		const { countries } = response.data;
		const countriesName = countries.map((country) => country.name);

		return countriesName;
	} catch (err) {
		console.log(err);
	}
};
