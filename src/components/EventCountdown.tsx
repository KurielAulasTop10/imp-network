import { useState, useEffect } from "react";

export default function EventCountdown() {
  const [localTime, setLocalTime] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<string | null>(null);

  useEffect(() => {
    const eventDate = new Date("2026-06-05T22:00:00+01:00");

    const formatter = new Intl.DateTimeFormat("pt-PT", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    const localTimeString = formatter.format(eventDate);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

    setLocalTime(localTimeString);
    setTimezone(tz);
  }, []);

  if (!localTime || !timezone) {
    return (
      <h2 className="text-4xl lg:text-5xl font-black mb-4 bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Prepare-se para 5 de Junho ás <br /> 22h (Portugal Continental) / 18h
        (Brasília)
      </h2>
    );
  }

  const getTimezoneLabel = () => {
    if (timezone.includes("Europe/Lisbon") || timezone.includes("London")) return "Portugal Continental";
    if (timezone.includes("America/Sao_Paulo")) return "Brasília";
    return timezone.split("/")[1]?.replace(/_/g, " ") || timezone;
  };

  return (
    <h2 className="text-4xl lg:text-5xl font-black mb-4 bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
      Prepare-se para {localTime} ({getTimezoneLabel()})
    </h2>
  );
}

