const getRad = (lat: number) => (lat * Math.PI) / 180;
const getLon2tile = (lon: number, zoom: number) => Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
const getLat2tile = (lat: number, zoom: number) => Math.floor(((1 - Math.log(Math.tan(getRad(lat)) + 1 / Math.cos(getRad(lat))) / Math.PI) / 2) * Math.pow(2, zoom));

//위경도 값을 넣으면 해당 지도 타일 주소를 리턴해줌
const getMapTileUrl = ({ lat, lng, zoom = 16 }: { lat: number; lng: number; zoom: number | undefined }) => {
  const x = getLon2tile(lng, zoom);
  const y = getLat2tile(lat, zoom);
  return `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
};

export default getMapTileUrl;
