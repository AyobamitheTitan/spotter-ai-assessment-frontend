import generateEldLog from "@/utils/generateELDlogs";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

import { XIcon } from "lucide-react";
import type React from "react";
import { useRef, useEffect } from "react";

interface TripData {
  geometry: [number, number][];
  distance: number; // in meters
  origin: [number, number];
  pickup: [number, number];
  dropoff: [number, number];
  bbox: [number, number, number, number];
}

interface ELDModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: TripData;
}

const ELDModal: React.FC<ELDModalProps> = ({ isOpen, onClose, trip }) => {
  if (!isOpen) return null;
  const domain = ["Off Duty", "Sleeper", "Driving", "On Duty"];
  const plotRef = useRef<HTMLDivElement>(null);
  const eldLogs = generateEldLog({ distance: trip.distance });
  // Convert eldLogs to plot points
  const eldPoints = eldLogs.flatMap((log) => {
    const now = new Date();
    const [startH, startM] = log.start.split(":").map(Number);
    const [endH, endM] = log.end.split(":").map(Number);

    const startTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      startH,
      startM
    );

    const endTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      endH,
      endM
    );

    return [
      { time: startTime, status: log.status },
      { time: endTime, status: log.status },
    ];
  });

  const extent = d3.extent(eldLogs, (d) => {
    const [hours, minutes] = d.start.split(":").map(Number);

    const now = new Date(); // today's date
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
      0, // seconds
      0 // milliseconds
    );
  });
  const dayExtent = [
    d3.timeDay.floor(extent[0] as Date),
    d3.timeDay.ceil(extent[1] as Date),
  ];
  const fifteen = d3.timeMinute
    .every(15)
    ?.range(dayExtent[0], dayExtent[1])
    .filter((_, i) => i % 2);
  const thirty = d3.timeMinute
    .every(30)
    ?.range(dayExtent[0], dayExtent[1])
    .filter((_, i) => i % 2);

  useEffect(() => {
    if (!plotRef.current) return;

    const renderChart = () => {
      if (!plotRef.current) return;

      const { width, height } = plotRef.current.getBoundingClientRect();

      const chart = Plot.plot({
        margin: 60,
        marginRight: 40,
        width: width || 800,
        height: height || 200,
        x: {
          type: "time",
          axis: "top",
          ticks: 25,
          tickFormat: "%H",
          grid: true,
          nice: true,
        },
        y: { domain, tickSize: 0, label: null },
        marks: [
          Plot.frame(),
          Plot.tickX(
            thirty?.flatMap((time) =>
              domain.map((status) => ({ time, status }))
            ),
            { x: "time", y: "status", strokeWidth: 0.25 }
          ),
          Plot.tickX(
            fifteen?.flatMap((time) =>
              domain.map((status) => ({ time, status }))
            ),
            {
              x: "time",
              y: "status",
              strokeDasharray: "0,5,4",
              strokeWidth: 0.25,
            }
          ),
          Plot.line(eldPoints, {
            x: "time",
            y: "status",
            curve: "step-after",
            stroke: "blue",
            strokeWidth: 2,
          }),
        ],
      });

      plotRef.current.innerHTML = "";
      plotRef.current.appendChild(chart);
    };

    // Initial render
    renderChart();

    // Observe resizing for responsiveness
    const observer = new ResizeObserver(renderChart);
    observer.observe(plotRef.current);

    // Cleanup
    return () => observer.disconnect();
  }, [fifteen, thirty, domain, dayExtent]);

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full flex items-center justify-center z-50`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-1 w-11/12 max-w-5xl h-[80vh] relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[1000] text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-bold"
        >
          <XIcon />
        </button>

        <div className="flex justify-center items-center w-full h-[300px] sm:h-[400px] md:h-[500px]  shadow-inner">
          <div ref={plotRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default ELDModal;
