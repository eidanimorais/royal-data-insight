import { RoyaltyData } from "@/types/data";
import { formatCurrency } from "@/utils/csv";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface RoyaltiesChartProps {
  data: RoyaltyData[];
}

export const RoyaltiesChart = ({ data }: RoyaltiesChartProps) => {
  const chartData = data.reduce((acc: any[], curr) => {
    const existing = acc.find((item) => item.ARTISTA === curr.ARTISTA);
    if (existing) {
      existing.ROYALTIES += curr.ROYALTIES;
    } else {
      acc.push({ ARTISTA: curr.ARTISTA, ROYALTIES: curr.ROYALTIES });
    }
    return acc;
  }, []);

  return (
    <div className="w-full h-[400px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ARTISTA" />
          <YAxis
            tickFormatter={(value) => formatCurrency(value).replace("R$", "")}
          />
          <Tooltip
            formatter={(value: number) => [formatCurrency(value), "Royalties"]}
          />
          <Bar
            dataKey="ROYALTIES"
            fill="hsl(var(--primary))"
            className="animate-fade-in"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};