export default interface Country {
  name: Name;
  population: number;
  flags: Flags;
  region: string;
  cca3: string;
}
interface Name {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}
interface Flags {
  png: string;
  svg: string;
  alt?: string;
}
