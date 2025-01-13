"use client";

import Heading from "../../_components/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../_context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

type SalesChartProps = {
  reservations:
    | {
        createdAt: Date;
        totalPrice: number | null;
        extrasPrice: number | null;
      }[]
    | undefined
    | undefined;
  numDays: number;
};

function SalesChart({ reservations, numDays }: SalesChartProps) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: reservations
        ?.filter((reservation) =>
          isSameDay(date, new Date(reservation.createdAt)),
        )
        .reduce((acc, cur) => acc + (cur.totalPrice || 0), 0),
      extrasSales: reservations
        ?.filter((reservation) =>
          isSameDay(date, new Date(reservation.createdAt)),
        )
        .reduce((acc, cur) => acc + (cur.extrasPrice || 0), 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <div className="col-start-1 -col-end-1 flex w-full flex-col gap-[2.4rem] overflow-x-auto rounded-md border border-gray-100 bg-white p-[3.2rem] text-[1.4rem] dark:border-gray-800 dark:bg-gray-0">
      <div className="min-w-[80rem]">
        <Heading as="h2">
          Sales from {format(allDates.at(0) as Date, "MMM dd yyyy")} &mdash;{" "}
          {format(allDates.at(-1) as Date, "MMM dd yyyy")}
        </Heading>

        <ResponsiveContainer height={300} width="100%">
          <AreaChart data={data}>
            <XAxis
              dataKey="label"
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <YAxis
              unit="$"
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <CartesianGrid strokeDasharray="4" />
            <Tooltip contentStyle={{ backgroundColor: colors.background }} />
            <Area
              dataKey="totalSales"
              type="monotone"
              stroke={colors.totalSales.stroke}
              fill={colors.totalSales.fill}
              strokeWidth={2}
              name="Total sales"
              unit="$"
            />
            <Area
              dataKey="extrasSales"
              type="monotone"
              stroke={colors.extrasSales.stroke}
              fill={colors.extrasSales.fill}
              strokeWidth={2}
              name="Total sales"
              unit="$"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesChart;
