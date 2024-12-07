import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "./index.css";
import marker from "@/assets/images/marker.png";

interface Props {
  setCoordinates: (coordinates: number[]) => void;
}

const CenterMarker = ({
  setCenter,
}: {
  setCenter: (coords: { lat: number; lng: number }) => void;
}) => {
  useMapEvents({
    moveend: (e) => {
      const map = e.target; // 현재 맵 객체
      const center = map.getCenter(); // 중심 좌표 얻기
      setCenter({ lat: center.lat, lng: center.lng }); // 부모 컴포넌트로 전달
    },
  });

  return null; // 시각적 요소는 없음
};

const SelectMapStep = ({ setCoordinates }: Props) => {
  const [center, setCenter] = useState({ lat: 37.5642135, lng: 127.0016985 });

  useEffect(() => {
    setCoordinates([center.lat, center.lng]);
  }, [center]);
  return (
    <div className="w-full h-full">
      <div className="text-[22px] font-bold px-[22px] pt-[54px]">
        캡슐을 <span className="text-primary-main">묻을 위치를 </span>
        <br />
        선택해 주세요.
      </div>
      <div className="relative h-[calc(100%-268px)] w-full px-[22px] py-8">
        <MapContainer
          center={[37.5642135, 127.0016985]}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full rounded-[16px]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <CenterMarker setCenter={setCenter} />
        </MapContainer>
        {/* 고정된 마커 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] z-[999]">
          <img src={marker} alt="" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default SelectMapStep;
