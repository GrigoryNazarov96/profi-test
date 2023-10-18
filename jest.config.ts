import type { Config } from "jest";

const config: Config = {
  transform: {},
  extensionsToTreatAsEsm: [".ts"],
  preset: "ts-jest",
  // testEnvironment: "node",
  // moduleFileExtensions: ["ts", "js"],
  // roots: ["<rootDir>/src", "<rootDir>/tests"],
};

export default config;
