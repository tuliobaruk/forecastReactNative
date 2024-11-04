import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header";
import WeatherInfo from "./components/WeatherInfo";

const Index = () => {
  const [selectedCity, setSelectedCity] = useState("");

  const cities = [
    { id: "BRXX0195", nome: "Recife" },
    { id: "BRXX0232", nome: "São Paulo" },
    { id: "BRXX0128", nome: "João Pessoa" },
    { id: "BRXX0143", nome: "Maceió" },
    { id: "BRXX0147", nome: "Manaus" },
  ];

  return (
    <View style={styles.container}>
      <Header
        cities={cities}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />
      {selectedCity && <WeatherInfo city={selectedCity} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 0,
  },
});

export default Index;
