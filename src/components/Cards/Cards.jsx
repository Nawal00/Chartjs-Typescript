import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.scss';

const Cards = ({ caseLabel, caseValue, lastUpdate }) => {
	const capitaliseLabel = (string) =>
		string.charAt(0).toUpperCase() + string.slice(1);

	return (
		<>
			{caseLabel !== 'lastUpdate' && (
				<Grid
					item
					component={Card}
					xs={12}
					md={3}
					className={cx(styles.card)}
					case-label={caseLabel}
				>
					<CardContent>
						<Typography color='textSecondary'>
							{capitaliseLabel(caseLabel)}
						</Typography>
						<Typography variant='h5'>
							<CountUp start={0} end={caseValue} duration={2.5} separator=',' />
						</Typography>
						<Typography color='textSecondary'>
							{new Date(lastUpdate).toDateString()}
						</Typography>
						<Typography variant='body2'>
							No of {caseLabel} cases of Covid-19
						</Typography>
					</CardContent>
				</Grid>
			)}
		</>
	);
};

export default Cards;
