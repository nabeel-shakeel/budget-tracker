import { useState } from 'react';
import { Select, Typography, theme } from 'antd';
import { Card } from '@ui';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { LabelPrefix } from '@components';
import { useFetchExpensesTrend } from '@features/expenses/expenses.api';
import styles from './analysis-chart.module.scss';

const { Title } = Typography;
const { useToken } = theme;

const rangeOptions = [
  { value: 'lastMonth', label: 'Last month' },
  { value: 'last6', label: 'Last 6 month' },
  { value: 'last12', label: 'Last 12 month' },
];

const data = [
  { month: 'Jan', value: 68 },
  { month: 'Feb', value: 79 },
  { month: 'Mar', value: 79 },
  { month: 'Apr', value: 52 },
  { month: 'May', value: 78 },
  { month: 'Jun', value: 18 },
  { month: 'Jul', value: 23 },
  { month: 'Aug', value: 50 },
  { month: 'Sep', value: 63 },
  { month: 'Oct', value: 75 },
  { month: 'Nov', value: 88 },
  { month: 'Dec', value: 30 },
];

export function AnalysisChart() {
  const { token } = useToken();
  const [range, setRange] = useState('');
  const { data: trendsData } = useFetchExpensesTrend(range);

  return (
    <Card className={styles.analysisChart}>
      <div className={styles.analysisHeader}>
        <Title level={5}>Expenses</Title>
        <LabelPrefix label="Range">
          <Select
            allowClear
            className={styles.rangeSelector}
            onChange={(value) => setRange(value)}
            options={rangeOptions}
          />
        </LabelPrefix>
      </div>
      <ResponsiveContainer width="100%" height={600}>
        <LineChart
          // data={data}
          data={trendsData?.trend || []}
          margin={{ top: 40, right: 30, bottom: 40, left: 10 }}
        >
          <CartesianGrid vertical={false} stroke={token.colorBorder} />
          <XAxis
            dataKey="month"
            label={{ value: 'Months', position: 'insideBottom', offset: -10 }}
            style={{ fontSize: '12px' }}
          />
          <YAxis
            domain={[0, 10000]}
            tickCount={10}
            label={{ value: 'Value', angle: -90, position: 'insideLeft' }}
            style={{ fontSize: '12px' }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke={token.colorPrimary}
            strokeWidth={2}
            dot={{
              r: 3,
              stroke: token.colorPrimary,
              strokeWidth: 2,
              fill: token.colorPrimary,
            }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
