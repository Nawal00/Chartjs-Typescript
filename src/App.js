import React from "react";

import { Cards, Chart, CountryPicker } from "./components/index";
import styles from './App.module.scss';

class App extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Cards />
        <CountryPicker />
        <Chart />
      </div>
    );
  }
}

export default App;
