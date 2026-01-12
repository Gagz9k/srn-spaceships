import { Platform } from "react-native";

const getBaseUrl = () => {

  if (Platform.OS === "android") return "http://10.0.2.2:3000";
  return "http://localhost:3000";
};

export const API_BASE_URL = getBaseUrl();

export async function fetchSpaceships() {
  const res = await fetch(`${API_BASE_URL}/spaceships`);
  if (!res.ok) throw new Error("Failed to fetch spaceships");
  return res.json();
}
