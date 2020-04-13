import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.scss';
import { fetchCountries } from '../../api/index';

const CountryPicker = ({ handleCountryChange }) => {
	const [countries, setcountries] = useState([]);

	useEffect(() => {
		const fetchApi = async () => {
			setcountries(await fetchCountries());
		};
		fetchApi();
	}, [setcountries]);

	return (
		<FormControl className={styles.formControl}>
			<NativeSelect
				defaultValue=''
				onChange={(e) => handleCountryChange(e.target.value)}
			>
				<option value='global'>Global</option>
				{countries.map((country, i) => (
					<option value={country} key={i}>
						{country}
					</option>
				))}
			</NativeSelect>
		</FormControl>
	);
};

export default CountryPicker;
