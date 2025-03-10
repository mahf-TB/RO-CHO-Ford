import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function DateTimeHeader() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Met à jour chaque seconde

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" flex flex-col">
      <span className="font-sans uppercase font-semibold text-xs">
        {format(dateTime, "EEEE dd MMMM yyyy", { locale: fr })}
      </span>
      <span className="text-sm text-violet-800">
        {format(dateTime, "HH:mm:ss", { locale: fr })}
      </span>
    </div>
  );
}
