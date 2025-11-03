export interface EldEvent {
  start: string;
  end: string;
  status: "Off Duty" | "Sleeper" | "Driving" | "On Duty";
  description: string;
}

interface EldInput {
  distance: number;
  avgSpeed?: number;
  fuelingInterval?: number;
  steps: { distance: number; duration: number }[];
}

export default function generateEldLog({}: EldInput): EldEvent[] {
  const segments: EldEvent[] = [];

  // Start the day at 6:00 AM (driver wakes up)
  let currentHour = 6;

  segments.push({
    start: "00:00",
    end: "06:00",
    status: "Sleeper",
    description: "Rest (10-hour off duty split)",
  });

  segments.push({
    start: "06:00",
    end: "07:00",
    status: "On Duty",
    description: "Pickup / Pre-trip Inspection",
  });
  currentHour = 7;

  if (currentHour + 1 <= 24) {
    segments.push({
      start: `${Math.floor(currentHour)}:00`,
      end: `${Math.floor(currentHour + 1)}:00`,
      status: "On Duty",
      description: "Drop-off / Post-trip inspection",
    });
    currentHour += 1;
  }

  if (currentHour < 24) {
    segments.push({
      start: `${Math.floor(currentHour)}:00`,
      end: "24:00",
      status: "Off Duty",
      description: "End of shift / Rest",
    });
  }

  return segments;
}
