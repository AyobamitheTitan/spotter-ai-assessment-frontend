import { themeStore } from "@/store/themeStore";
import { useStore } from "@tanstack/react-store";
import { Map, Activity } from "lucide-react";
import { useState } from "react";
import MapModal from "./MapModal";
import ELDModal from "./ELDModal";

const buttonBaseClasses =
  "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium border transition-colors";

const buttonThemeClasses = {
  light: "bg-white border-gray-300 hover:bg-gray-100 text-gray-900",
  dark: "bg-gray-800 border-gray-700 hover:bg-gray-700 text-white",
};

export default function TripELDMap({ details }: { details: any }) {
  const { theme } = useStore(themeStore);

  const [isELDOpen, setIsELDOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <div className="w-full py-4 flex justify-center items-center px-4">
      {/* === Action Buttons Container === */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
        <button
          onClick={() => setIsELDOpen(true)}
          className={`${buttonBaseClasses} ${theme === "dark" ? buttonThemeClasses.dark : buttonThemeClasses.light}`}
        >
          <Activity size={18} />
          View ELD
        </button>

        <button
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
