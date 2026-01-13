module.exports = {
  preset: "jest-expo",
  testMatch: ["**/__tests__/**/*.test.js"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?/.*|react-native-screens|react-native-safe-area-context|@unimodules/.*|unimodules)/)"
  ]
};
