import type { FC } from 'react';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useRecoilValue } from 'recoil';

import { colorTheme } from 'src/recoil/atoms/colorTheme';
import styles from 'src/styles/sandbox/compound_interest.module.scss';

//https://v4.mui.com/ja/customization/color/
const strokes = ['#f44336', '#9c27b0', '#5c6bc0', '#29b6f6', '#4caf50', '#ffc107', '#795548', '#607d8b'];
const darkModeStrokes = ['#e57373', '#ce93d8', '#9fa8da', '#81d4fa', '#81c784', '#ffd54f', '#a1887f', '#90a4ae'];

type Props = {
  data: {
    year: number;
    [key: string]: number;
  }[];
};

const Chart: FC<Props> = ({ data }) => {
  const isDarkMode = useRecoilValue(colorTheme);
  const displayChartData = () => {
    const lineList = [];

    for (let i = 0; i < Object.keys(data[0]).length - 1; i++) {
      //https://recharts.org/en-US/api/Line
      data[i]?.year &&
        lineList.push(
          <Line
            key={data[i].year}
            type="monotone"
            r={2}
            dataKey={`資産${i + 1}`}
            stroke={isDarkMode === 'dark' ? darkModeStrokes[i] : strokes[i]}
            strokeWidth={2}
          />,
        );
    }

    return lineList;
  };

  console.log('data', data);

  return (
    <div className={styles.chart_container}>
      {data.length > 1 && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={isDarkMode === 'dark' ? { fill: '#f0f0f0' } : {}} />
            <YAxis tickCount={10} tick={isDarkMode === 'dark' ? { fill: '#f0f0f0' } : {}} />
            <Tooltip separator=" : " formatter={(value: number) => String(value.toLocaleString()) + '万円'} />
            <Legend />
            {displayChartData()}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
