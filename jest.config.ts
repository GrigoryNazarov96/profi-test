import type { Config } from "jest";

const config: Config = {
  transform: {},
  extensionsToTreatAsEsm: [".ts"],
  preset: "ts-jest",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
};

export default config;
