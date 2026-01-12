import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function FactionFilter({ value, options, onChange }) {
  return (
    <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
      <Text style={{ marginBottom: 6, fontWeight: "600" }}>Filtrar por Facción</Text>
      <View style={{ borderWidth: 1, borderRadius: 8 }}>
        <Picker selectedValue={value} onValueChange={onChange}>
          {options.map((opt) => (
            <Picker.Item key={opt} label={opt} value={opt} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
