import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  className?: string;
}

export const MetricCard = ({ title, value, className }: MetricCardProps) => {
  return (
    <Card className={cn("p-6 backdrop-blur-sm bg-white/50", className)}>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </Card>
  );
};