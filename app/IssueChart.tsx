'use client';

import { Card, Flex, Text, Button } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
  currentPeriod?: string;
}

const IssueChart = ({ open, inProgress, closed, currentPeriod = 'all' }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const data = [
    { label: 'Open', value: open, color: '#ef4444' },
    { label: 'In Progress', value: inProgress, color: '#3b82f6' },
    { label: 'Closed', value: closed, color: '#10b981' },
  ];

  const handlePeriodChange = (period: string) => {
    const params = new URLSearchParams(searchParams);
    if (period === 'all') {
      params.delete('period');
    } else {
      params.set('period', period);
    }
    router.push(`/?${params.toString()}`);
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'today':
        return 'Today';
      case 'week':
        return 'Last 7 Days';
      case 'month':
        return 'This Month';
      default:
        return 'All Time';
    }
  };

  const periodButtons = [
    { key: 'all', label: 'All Time' },
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'Last 7 Days' },
    { key: 'month', label: 'This Month' },
  ];

  return (
    <Card>
      <Flex direction="column" gap="4">
        {/* Header with period selector */}
        <Flex justify="between" align="center">
          <Text size="4" weight="bold">
            Issues Chart - {getPeriodLabel(currentPeriod)}
          </Text>
          <Flex gap="2">
            {periodButtons.map((button) => (
              <Button
                key={button.key}
                variant={currentPeriod === button.key ? 'solid' : 'soft'}
                size="1"
                onClick={() => handlePeriodChange(button.key)}
              >
                {button.label}
              </Button>
            ))}
          </Flex>
        </Flex>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="value" 
              barSize={60}
              style={{ fill: "var(--accent-9)" }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="var(--accent-9)"/>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Summary stats */}
        <Flex justify="center" gap="4">
          <Flex direction="column" align="center">
            <Text size="2" color="gray">Total Issues</Text>
            <Text size="4" weight="bold">{open + inProgress + closed}</Text>
          </Flex>
          <Flex direction="column" align="center">
            <Text size="2" color="gray">Open Rate</Text>
            <Text size="4" weight="bold">
              {open + inProgress + closed > 0 
                ? `${Math.round((open / (open + inProgress + closed)) * 100)}%`
                : '0%'
              }
            </Text>
          </Flex>
          <Flex direction="column" align="center">
            <Text size="2" color="gray">Completion Rate</Text>
            <Text size="4" weight="bold">
              {open + inProgress + closed > 0 
                ? `${Math.round((closed / (open + inProgress + closed)) * 100)}%`
                : '0%'
              }
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default IssueChart;
