// src/pages/NewEntryPage.tsx
import { useState } from "react";
import { useStore } from "@tanstack/react-store";
import { Save, Loader2 } from "lucide-react";
// import ELDModal from '@/components/ELDModal'
// import MapModal from '@/components/MapModal'
import { themeStore } from "@/store/themeStore";
import { tripStore } from "@/store/tripStore";

const fields = [
  { name: "date", label: "Date", type: "date", placeholder: "" },
  {
    name: "current_location",
    label: "Current location",
    type: "text",
    placeholder: "Enter current location",
  },
  {
    name: "pickup_location",
    label: "Pickup location",
    type: "text",
    placeholder: "Enter pickup location",
  },
  {
    name: "dropoff_location",
    label: "Dropoff location",
    type: "text",
    placeholder: "Enter dropoff location",
  },
  {
    name: "current_cycle_used_hrs",
    label: "Current cycle used (in hours)",
    type: "number",
    placeholder: "Enter current cycle",
  },
];

export default function NewTripEntry() {
  const { theme } = useStore(themeStore);
  const { loading, submitNewTrip } = useStore(tripStore);
  const [formData, setFormData] = useState(
    Object.fromEntries(fields.map((f) => [f.name, ""]))
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await submitNewTrip(formData as any);
  };

  const allFieldsFilled = Object.values(formData).every(
    (value) => value.toString().trim() !== ""
  );

  const formClasses = `w-full max-w-md rounded-2xl shadow-md p-6 border transition-colors ${
    theme === "dark"
      ? "bg-gray-900 border-gray-800 text-gray-200"
      : "bg-white border-gray-200 text-gray-800"
  }`;

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row md:items-start items-center justify-center gap-12 sm:p-12 transition-colors ${
        theme === "dark"
          ? "bg-gray-950 text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* === Form Section === */}
      <form onSubmit={handleSubmit} className={formClasses}>
        <h2 className="text-xl font-semibold mb-4">New Entry</h2>

        <div className="grid gap-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 transition ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 focus:ring-blue-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 focus:ring-blue-400 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
          ))}
        </div>
        <button
          disabled={loading || !allFieldsFilled}
          type="submit"
          className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition
          ${
            !loading && allFieldsFilled
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-[spin_2s_linear_infinite]" />
              Saving
            </>
          ) : (
            <>
              <Save size={16} />
              Save Entry
            </>
          )}
        </button>
      </form>
    </div>
  );
}
