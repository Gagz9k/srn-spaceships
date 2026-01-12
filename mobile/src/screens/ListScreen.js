import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, View } from "react-native";
import { fetchSpaceships } from "../api/client";
import FactionFilter from "../components/FactionFilter";
import { filterByFaction } from "../utils/filter";

export default function ListScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const [faction, setFaction] = useState("All");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchSpaceships();
        if (!mounted) return;
        setItems(data);
      } catch (e) {
        if (!mounted) return;
        setError(e?.message || "Unknown error");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const factionOptions = useMemo(() => {
    const set = new Set(items.map((x) => x.faction).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [items]);

  const filtered = useMemo(() => filterByFaction(items, faction), [items, faction]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Cargando naves...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontWeight: "700", marginBottom: 8 }}>Error</Text>
        <Text>{error}</Text>
        <Text style={{ marginTop: 12 }}>
          Verifica conectividad: API levantada en {` `}
          <Text style={{ fontWeight: "700" }}>http://10.0.2.2:3000</Text> (Android emu) o {` `}
          <Text style={{ fontWeight: "700" }}>http://localhost:3000</Text> (iOS sim).
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FactionFilter value={faction} options={factionOptions} onChange={setFaction} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id ?? item.name)}
        contentContainerStyle={{ padding: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("Detail", { ship: item })}
            style={{
              padding: 12,
              borderRadius: 12,
              borderWidth: 1
            }}
            testID={`ship-row-${item.id ?? item.name}`}
          >
            <Text style={{ fontSize: 16, fontWeight: "700" }}>{item.name}</Text>
            <Text style={{ marginTop: 4 }}>Facción: {item.faction}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
