export function filterByFaction(items, faction) {
  if (!faction || faction === "All") return items;
  return items.filter((x) => x.faction === faction);
}
