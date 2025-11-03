export interface EldEvent {
  start: string;
  end: string;
  status: string;
  description: string;
}

export default function generateEldLog({}: {
  distance: number;
  avgSpeed?: number;
  fuelingInterval?: number;
}): EldEvent[] {
  // const drivingHours = distance / avgSpeed;
  // const fuelingStops = Math.floor(distance / fuelingInterval);

  const segments: EldEvent[] = [];
  let currentHour = 6; // Assuming our driver wakes up at 6
  segments.push({
    start: "00:00",
    end: "06:00",
    status: "Sleeper",
    description: "Sleeper",
  });
  segments.push({
    start: "06:00",
    end: "07:00",
    status: "On Duty",
    description: "Pickup / Inspection",
  });

  // for (let i = 0; i < fuelingStops; i++) {
  //   const driveStart = currentHour;
  //   const driveEnd = Math.min(driveStart + fuelingInterval / avgSpeed, 24);
  //   segments.push({
  //     start: `${driveStart}:00`,
  //     end: `${driveEnd}:00`,
  //     status: "D",
  //     description: "Driving",
  //   });

  //   currentHour = driveEnd;
  //   if (currentHour < 24) {
  //     segments.push({
  //       start: `${currentHour}:00`,
  //       end: `${currentHour + 0.5}:00`,
  //       status: "ON",
  //       description: "Fueling",
  //     });
  //     currentHour += 0.5;
  //   }
  // }

  segments.push({
    start: `${Math.floor(currentHour)}:00`,
    end: `${Math.min(currentHour + 1, 24)}:00`,
    status: "On Duty",
    description: "Drop-off",
  });

  segments.push({
    start: `${Math.min(currentHour + 1, 24)}:00`,
    end: "24:00",
    status: "Off Duty",
    description: "Off Duty",
  });

  return segments;
}
