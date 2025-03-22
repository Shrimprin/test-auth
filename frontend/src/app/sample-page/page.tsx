"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

export default function SamplePage() {
  const router = useRouter();

  // 天気情報を取得する関数
  async function fetchWeather() {
    try {
      const response = await axios.get(
        "https://weather.tsukumijima.net/api/forecast/city/400040",
      );
      console.log("Weather Data:", response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  return (
    <div>
      <h1>Sample Page</h1>
      <div>
        <button onClick={() => router.push("/")}>Go to Home</button>
      </div>
      <div>
        <button onClick={fetchWeather}>Fetch Weather</button>
      </div>
    </div>
  );
}
