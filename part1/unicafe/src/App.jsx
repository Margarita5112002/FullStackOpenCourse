import { useState } from "react";

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, all, average, positivePer }) => {
  if (all == 0) {
    return <div>No Feedback Given</div>;
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positivePer + "%"} />
        </tbody>
      </table>
    </>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const getAll = () => good + bad + neutral;

  const getAverage = () => {
    const total = getAll();
    if (total == 0) {
      return 0;
    }
    return (good - bad) / total;
  };

  const getPositivePercentage = () => {
    const total = getAll();
    if (total == 0) {
      return 0;
    }
    return (good / getAll()) * 100;
  };

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        average={getAverage()}
        all={getAll()}
        positivePer={getPositivePercentage()}
      />
    </>
  );
};

export default App;
