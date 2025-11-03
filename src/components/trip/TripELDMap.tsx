import { themeStore } from "@/stores/themeStore";
import { useStore } from "@tanstack/react-store";
import { Map, Activity } from "lucide-react";
import { useState } from "react";
import MapModal from "./MapModal";
import ELDModal from "./ELDModal";

const buttonBaseClasses =
  "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium border transition-colors";

const buttonThemeClasses = {
  light: `
    bg-white border border-gray-300 text-gray-900
    hover:bg-gray-100
    disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed
  `,
  dark: `
    bg-gray-800 border border-gray-700 text-white
    hover:bg-gray-700
    disabled:bg-gray-700 disabled:text-gray-500 disabled:border-gray-600 disabled:cursor-not-allowed
  `,
};

export default function TripELDMap({
  details,
  enabled,
}: {
  details: any;
  enabled: boolean;
}) {
  const { theme } = useStore(themeStore);

  const [isELDOpen, setIsELDOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div className="w-full py-4 flex justify-center items-center px-4">
      {/* === Action Buttons Container === */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
        <button
          disabled={!enabled}
          onClick={() => setIsELDOpen(true)}
          className={`${buttonBaseClasses} ${theme === "dark" ? buttonThemeClasses.dark : buttonThemeClasses.light}`}
        >
          <Activity size={18} />
          View ELD
        </button>

        <button
          disabled={!enabled}
          onClick={() => setIsMapOpen(true)}
          className={`${buttonBaseClasses} ${theme === "dark" ? buttonThemeClasses.dark : buttonThemeClasses.light}`}
        >
          <Map size={18} />
          View Map Route
        </button>
      </div>

      {/* === Modals === */}
      {isELDOpen && (
        <ELDModal
          trip={details}
          isOpen={isELDOpen}
          onClose={() => setIsELDOpen(false)}
        />
      )}

      <MapModal
        trip={details}
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
      />
    </div>
  );
}
