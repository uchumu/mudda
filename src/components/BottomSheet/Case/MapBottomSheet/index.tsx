import { Dispatch, SetStateAction } from "react";
import BottomSheet from "../../BottomSheetBase";
import { MapContainer, TileLayer } from "react-leaflet";
import marker from "@/assets/images/marker.png";

interface Props {
  coordinateX: number;
  coordinateY: number;
  setIsShown: Dispatch<SetStateAction<boolean>>;
}

const MapBottomSheet = ({ setIsShown, coordinateX, coordinateY }: Props) => {
  return (
    <BottomSheet setIsShown={setIsShown}>
      <div className="w-full h-full">
        <MapContainer
          className="w-full h-full"
          center={[coordinateX, coordinateY]}
          zoom={25}
          scrollWheelZoom={false}
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
          keyboard={false}
          zoomControl={false}
        >
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
        {/* 고정된 마커 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] z-[999]">
          <img src={marker} alt="마커" className="w-full h-full" />
        </div>
      </div>
    </BottomSheet>
  );
};

export default MapBottomSheet;
