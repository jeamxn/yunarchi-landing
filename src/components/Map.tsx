import dynamic from "next/dynamic";
import React from "react";
import { Container as MapDiv, NaverMap, Marker, useNavermaps, NavermapsProvider } from "react-naver-maps";

const Map = () => {
  const navermaps = useNavermaps();
  return (
    <NavermapsProvider
      ncpClientId="4oiw88adxd"
    >
      <MapDiv
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <NaverMap
          center={{ lat: 35.14385613873518, lng: 129.10985620668126 }}
        >
          <Marker defaultPosition={{ lat: 35.14385613873518, lng: 129.10985620668126 }} />
        </NaverMap>
      </MapDiv>
    </NavermapsProvider>
  );
};

export default dynamic(() => Promise.resolve(Map), {
  ssr: false,
});