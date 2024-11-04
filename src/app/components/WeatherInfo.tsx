import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";

interface WeatherData {
  temp: number;
  description: string;
  humidity: number;
  wind_speedy: string;
  city_name: string;
  date: string;
  time: string;
  sunrise: string;
  sunset: string;
  condition_slug: string;
  forecast: {
    date: string;
    weekday: string;
    max: number;
    min: number;
    description: string;
    condition: string;
  }[];
}

interface WeatherInfoProps {
  city: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.hgbrasil.com/weather/?format=json&cid=${city}`
        );
        setWeatherData(response.data.results);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (!weatherData) {
    return <Text>Carregando...</Text>;
  }

  const getWeatherIconUrl = (condition_slug: string) => {
    return `https://assets.hgbrasil.com/weather/icons/conditions/${condition_slug}.svg`;
  };

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.city}>{weatherData.city_name}</Text>
        <Image
          source={{ uri: getWeatherIconUrl(weatherData.condition_slug) }}
          style={styles.weatherIcon}
        />
        <Text style={styles.temp}>{weatherData.temp}°C</Text>
        <Text style={styles.description}>{weatherData.description}</Text>
        <Text style={styles.details}>Humidity: {weatherData.humidity}%</Text>
        <Text style={styles.details}>Wind: {weatherData.wind_speedy}</Text>
        <Text style={styles.details}>Date: {weatherData.date}</Text>
        <Text style={styles.details}>Time: {weatherData.time}</Text>
        <Text style={styles.details}>Sunrise: {weatherData.sunrise}</Text>
        <Text style={styles.details}>Sunset: {weatherData.sunset}</Text>

        <Text style={styles.forecastTitle}>Forecast for the next days:</Text>
        <FlatList
          data={weatherData.forecast}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={styles.forecastItem}>
              <Text style={styles.forecastDate}>
                {item.weekday} - {item.date}
              </Text>
              <Image
                source={{ uri: getWeatherIconUrl(item.condition) }}
                style={styles.forecastIcon}
              />
              <Text style={styles.forecastTemp}>
                Max: {item.max}°C, Min: {item.min}°C
              </Text>
              <Text style={styles.forecastDescription}>{item.description}</Text>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 10,
    width: "90%",
  },
  city: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temp: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 18,
    fontStyle: "italic",
    color: "white",
  },
  details: {
    fontSize: 16,
    color: "white",
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "white",
  },
  forecastItem: {
    marginTop: 10,
    alignItems: "center",
  },
  forecastDate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
  forecastTemp: {
    fontSize: 16,
    color: "white",
  },
  forecastDescription: {
    fontSize: 14,
    fontStyle: "italic",
    color: "white",
  },
});

export default WeatherInfo;
