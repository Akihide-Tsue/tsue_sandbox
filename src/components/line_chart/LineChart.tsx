import { FC } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import styles from 'src/styles/sandbox/compound_interest.module.scss';

const strokes = ['#f44336', '#9c27b0', '#5c6bc0', '#29b6f6', '#4caf50', '#ffc107', '#795548', '#607d8b'];

type Props = {
  data: {
    year: number;
    [key: string]: number;
  }[];
};

const Chart: FC<Props> = ({ data }) => {
  const displayChartData = () => {
    const lineList = [];
    for (let i = 0; i < Object.keys(data[0]).length - 1; i++) {
      //https://recharts.org/en-US/api/Line
      lineList.push(<Line key={data[i].year} type="monotone" r={2} dataKey={`資産${i + 1}`} stroke={strokes[i]} strokeWidth={2} />);
    }
    return lineList;
  };

  return (
    <div className={styles.chart_container}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis tickCount={10} />
          <Tooltip />
          <Legend />
          {displayChartData()}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
