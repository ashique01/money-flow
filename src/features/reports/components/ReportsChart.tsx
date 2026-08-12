import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

interface Props {
  data: DataItem[];
}

export const ReportsChart = ({ data }: Props) => {
  if (!data.length) return null;
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#4f46e5" name="Amount" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
