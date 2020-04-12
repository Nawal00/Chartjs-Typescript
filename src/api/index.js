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
