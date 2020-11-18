
import React from 'react';
import { Grid } from '@material-ui/core';

import { Cards, Chart, CountryPicker } from './components/index';
import styles from './App.module.scss';
import { fetchData } from './api';

interface CovidDataNestObjectType {
	value: number
}

type State = {
	country: string,
	covidData: {
		[key: string] : CovidDataNestObjectType,
	}
}

class App extends React.Component<State> {
	state: State = {
		covidData: {},
		country: '',
	};

	async componentDidMount() {
		const fetchedData = await fetchData();
		this.setState({ covidData: fetchedData });
	}

	handleCountryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const country = e.target.value; 
		const fetchedData = await fetchData(country);
		this.setState({ covidData: fetchedData, country });
	};


	render() {
		const { covidData, country } = this.state;
		console.log('covidData', covidData);
		
		return (
			<div className={styles.container}>
				<Grid container spacing={3} justify='center'>
					{covidData &&
						Object.keys(covidData).map((caseLabel: string, i) => (
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
