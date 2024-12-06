import { Divider, Flex, Typography } from 'antd';
import { AnalysisChart } from '../../features/analysis/components';
const { Title } = Typography;

export function AnalysisPage() {
  return (
    <Flex gap="middle" vertical>
      <Flex justify="space-between">
        <Title level={1}>Analysis</Title>
      </Flex>
      <Divider />
      <AnalysisChart />
    </Flex>
  );
}
