
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ 
  icon, 
  title, 
  value, 
  description,
  trend, 
  className 
}: StatCardProps) => {
  return (
    <Card className={cn(
      "border-gold/20 shadow-gold-soft hover:shadow-lg transition-all duration-300",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-navy-600 rtl arabic">{title}</p>
            <div className="flex items-baseline space-x-2 rtl">
              <h3 className="text-2xl font-bold text-navy-700">{value}</h3>
              {trend && (
                <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-navy-500 rtl arabic">{description}</p>
            )}
          </div>
          <div className="bg-navy-50 p-3 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
