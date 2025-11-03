// stores/tripStore.ts
import axios from "axios";
import { Store } from "@tanstack/react-store";
import { toast } from "sonner";

export interface TripStep {
  distance: number; // in meters
  duration: number; // in seconds
  instruction: string;
}

export interface TripSummary {
  distance_km: number;
  duration_hr: number;
}

export interface TripDetailsData {
  id: string;
  trip: string;
  distance: number;
  duration: number;
  bbox: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
  geometry: [number, number][]; // [lng, lat][]
  steps: TripStep[];
  created_at: string; // ISO date string
  total_steps: number;
  main_summary: TripSummary;
}

interface TripData {
  date: string;
  currentLocation: string;
  pickupLocation: string;
  dropoffLocation: string;
  currentCycle: string;
}

export interface TripResponseData {
  id: string;
  current_location: string;
  pickup_location: string;
  dropoff_location: string;
  current_cycle_used_hrs: number;
}

interface TripStore {
  loading: boolean;
  loadingSingleTrip: boolean;
  loadingTrips: boolean;
  error: string | null;
  success: boolean | undefined;
  submitNewTrip: (data: TripData) => Promise<void>;
  getAllTrips: () => Promise<TripResponseData[] | undefined>;
  getTripDetailsByTripId: (
    trip_id: string
  ) => Promise<TripDetailsData | undefined>;
  getTripById: (id: string) => Promise<TripResponseData>;
  resetStatus: () => void;
}
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
export const tripStore = new Store<TripStore>({
  loading: false,
  loadingTrips: false,
  loadingSingleTrip: false,
  error: null,
  success: undefined,
  async getTripDetailsByTripId(trip_id: string) {
    tripStore.setState({
      ...tripStore.state,
      loadingSingleTrip: true,
    });
    try {
      const res = await axios.get<{ data: TripDetailsData[] }>(
        `${BASE_API_URL}/api/v1/trip-details/trip/${trip_id}`
      );
      return res.data.data[0] || {};
    } catch (error) {
      console.log(error);
    } finally {
      tripStore.setState({
        ...tripStore.state,
        loadingSingleTrip: false,
      });
    }
  },
  async getAllTrips() {
    tripStore.setState({
      ...tripStore.state,
      loadingTrips: true,
    });
    try {
      const res = await axios.get<{ data: TripResponseData[] }>(
        `${BASE_API_URL}/api/v1/trips`
      );
      return res.data.data || [];
    } catch (error) {
      console.log(error);
    } finally {
      tripStore.setState({
        ...tripStore.state,
        loadingTrips: false,
      });
    }
  },
  async getTripById(id: string) {
    tripStore.setState({
      ...tripStore.state,
      loadingSingleTrip: true,
    });
    try {
      const res = await axios.get(`${BASE_API_URL}/api/v1/trips/${id}`);
      console.log(res.data);
      return res.data?.data;
    } catch (error) {
      console.log(error);
    } finally {
      tripStore.setState({
        ...tripStore.state,
        loadingTrips: false,
      });
    }
  },
  async submitNewTrip(data) {
    tripStore.setState({
      ...tripStore.state,
      loading: true,
      error: null,
      success: undefined,
    });
    try {
      await axios.post(`${BASE_API_URL}/api/v1/trips`, data);
      toast.success("Trip has been recorded");
    } catch (error) {
      console.log(error);
      toast.error("Unable to record the trip",{});
    } finally {
      tripStore.setState({ ...tripStore.state, loading: false });
    }
  },
  resetStatus() {},
});

tripStore.setState({
  ...tripStore.state,
  resetStatus: () => {
    tripStore.setState({
      ...tripStore.state,
      loading: false,
      error: null,
      success: undefined,
    });
  },
});
