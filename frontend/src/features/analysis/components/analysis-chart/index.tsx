import { Card, Select, Typography } from 'antd';
import { Line } from '@ant-design/plots';
import './analysis-chart.styles.scss';

const { Title, Text } = Typography;

export function AnalysisChart() {
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

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    smooth: true,
    color: '#7539FF',
    point: {
      size: 5,
      shape: 'circle',
      style: {
        fill: '#7539FF',
        stroke: '#7539FF',
        lineWidth: 2,
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      tickInterval: 10,
    },
  };

  return (
    <Card className="analysis-chart">
      <div className="analysis-header">
        <Title level={5} className="title">
          Expenses
        </Title>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: '4px',
            gap: '5px',
            backgroundColor: '#E1E8F2',
          }}
        >
          <Text
            style={{
              fontSize: '12px',
              fontWeight: 400,
              marginLeft: '8px',
              color: '#667085',
            }}
          >
            Range
          </Text>
          <Select
            defaultValue="last12"
            className="range-selector"
            options={[
              { value: 'lastMonth', label: 'Last month' },
              { value: 'last6', label: 'Last 6 month' },
              { value: 'last12', label: 'Last 12 month' },
            ]}
          />
        </div>
      </div>
      <Line {...config} />
    </Card>
  );
}
