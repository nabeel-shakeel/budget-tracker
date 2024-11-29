import { Divider, Flex, Typography } from 'antd';
import { AnalysisChart } from '../../features/analysis/components';
const { Title } = Typography;

export function AnalysisPage() {
  return (
    <Flex gap="large" vertical>
      <Flex justify="space-between">
        <Title
          level={1}
          style={{
            margin: 0,
          }}
        >
          Analysis
        </Title>
      </Flex>
      <Divider style={{ margin: 0, borderColor: '#DDE4F0' }} />
      <Title
        level={1}
        style={{
          margin: 0,
        }}
      >
        <AnalysisChart />
      </Title>
    </Flex>
  );
}
