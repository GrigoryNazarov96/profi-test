import shortid from "shortid";

export default function generateRandomSequence(): string {
  return shortid.generate();
}
