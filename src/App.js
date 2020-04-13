import React from 'react';
import { Grid } from '@material-ui/core';

import { Cards, Chart, CountryPicker } from './components/index';
import styles from './App.module.scss';
import { fetchData } from './api';

class App extends React.Component {
	state = {
		covidData: {},
		country: '',
	};

	async componentDidMount() {
		const fetchedData = await fetchData();
		this.setState({ covidData: fetchedData });
	}

	handleCountryChange = async (country) => {
		const fetchedData = await fetchData(country);
		console.log(fetchedData);
		this.setState({ covidData: fetchedData, country });
	};

	render() {
		const { covidData, country } = this.state;

		return (
			<div className={styles.container}>
				<Grid container spacing={3} justify='center'>
					{covidData &&
						Object.keys(covidData).map((caseLabel, i) => (
							<Cards
								key={i}
								caseLabel={caseLabel}
								caseValue={covidData[caseLabel].value}
								lastUpdate={covidData['lastUpdate']}
							/>
						))}
				</Grid>
				<CountryPicker handleCountryChange={this.handleCountryChange} />
				<Chart country={country} covidData={covidData} />
			</div>
		);
	}
}

export default App;
