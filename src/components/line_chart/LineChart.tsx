import { FC } from 'react';

import { Chart } from 'react-google-charts';

export const options = {
  // title: '運用予測',
  curveType: 'function', //線の形状
  legend: { position: 'bottom' },
};

type Props = {
  data: (string | number)[][];
};

const LineChart: FC<Props> = ({ data }) => {
  return <Chart chartType="LineChart" width="100%" height="400px" data={data} options={options} />;
};

export default LineChart;
