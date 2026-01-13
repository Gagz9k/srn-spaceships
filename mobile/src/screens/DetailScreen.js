import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function DetailScreen({ route }) {
  const ship = route?.params?.ship;

  if (!ship) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text>No hay datos de la nave.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "800" }}>{ship.name}</Text>
      <Text style={{ marginTop: 8, fontSize: 14 }}>Facción: {ship.faction}</Text>

      <Text style={{ marginTop: 16, fontWeight: "700" }}>Descripción</Text>
      <Text style={{ marginTop: 8, lineHeight: 20 }}>{ship.description}</Text>
    </ScrollView>
  );
}
