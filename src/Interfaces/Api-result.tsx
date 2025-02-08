export default interface Data {
  name: string;
  id: number;
  status: string;
  gender: string;
  image: string;
  origin: Origin;
}
interface Origin {
  name: string;
}
