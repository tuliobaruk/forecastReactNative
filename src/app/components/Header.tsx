import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

interface City {
  id: string;
  nome: string;
}

interface HeaderProps {
  cities: City[];
  selectedCity: string;
  onCityChange: (cityId: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  cities,
  selectedCity,
  onCityChange,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <Ionicons name="location-sharp" size={24} color="white" />
        <Picker
          selectedValue={selectedCity}
          style={styles.picker}
          onValueChange={(itemValue) => onCityChange(itemValue)}
        >
          {cities.map((city) => (
            <Picker.Item key={city.id} label={city.nome} value={city.id} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="notifications" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#6200EE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    height: 50,
    width: 250,
    color: "white",
  },
  iconButton: {
    padding: 10,
  },
});

export default Header;
