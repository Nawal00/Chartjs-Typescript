import React from 'react';

import { Cards, Chart, CountryPicker } from './components/index';
import styles from './App.module.scss';
import { fetchData } from './api';

class App extends React.Component {
	state = {
		covidData: {},
	};

	async componentDidMount() {
		const fetchedData = await fetchData();
		this.setState({ covidData: fetchedData });
	}

	render() {
		const { covidData } = this.state;

		return (
			<div className={styles.container}>
				{Object.keys(covidData).map((caseLabel, i) => (
					<Cards
						key={i}
						caseLabel={caseLabel}
						caseValue={covidData[caseLabel].value}
						lastUpdate={covidData['lastUpdate']}
					/>
				))}
				<CountryPicker />
				<Chart />
			</div>
		);
	}
}

export default App;
