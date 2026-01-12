import { filterByFaction } from "../utils/filter";

describe("filterByFaction", () => {
  const items = [
    { id: 1, name: "A", faction: "Empire" },
    { id: 2, name: "B", faction: "Rebels" },
    { id: 3, name: "C", faction: "Empire" }
  ];

  test("returns all items when faction is All", () => {
    expect(filterByFaction(items, "All")).toHaveLength(3);
  });

  test("filters correctly by faction", () => {
    const res = filterByFaction(items, "Empire");
    expect(res).toHaveLength(2);
    expect(res.map((x) => x.id)).toEqual([1, 3]);
  });
});
