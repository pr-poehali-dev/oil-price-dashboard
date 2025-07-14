import { useMemo } from 'react';

interface MiniChartProps {
  data: number[];
  color?: string;
  height?: number;
  className?: string;
}

export const MiniChart = ({ data, color = 'rgb(34, 197, 94)', height = 40, className = '' }: MiniChartProps) => {
  const pathData = useMemo(() => {
    if (data.length < 2) return '';
    
    const width = 200;
    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue || 1;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - minValue) / range) * height;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  }, [data, height]);

  return (
    <div className={`w-full ${className}`}>
      <svg width="100%" height={height} viewBox={`0 0 200 ${height}`} className="overflow-visible">
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};