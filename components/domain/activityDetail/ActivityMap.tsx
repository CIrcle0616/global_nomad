'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import ActivityMapFooter from './ActivityMapFooter';

export default function ActivityMap({ address }: { address: string }) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao?.maps) {
      window.kakao.maps.load(() => {
        setSdkLoaded(true);
      });
    }
  }, []);

  // 주소 → 좌표 변환
  useEffect(() => {
    if (!sdkLoaded || !address) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === 'OK') {
        const { x, y } = result[0];
        const lat = parseFloat(y);
        const lng = parseFloat(x);
        setPosition({ lat, lng });
      } else {
        console.error('[GEOCODER] 주소 변환 실패:', status);
      }
    });
  }, [sdkLoaded, address]);

  if (!sdkLoaded) return <p>지도 SDK 로딩 중...</p>;
  if (!position) return <p>지도 위치 변환 중...</p>;

  return (
    <div className="w-full my-10 mx-auto">
      {/* 지도 영역 */}
      <div className="h-[450px] md:h-[276px] lg:h-[352px] relative">
        <Map center={position} className="w-full h-full" level={3}>
          <MapMarker position={position} />
        </Map>
      </div>

      {/* 주소 정보 */}
      <ActivityMapFooter address={address} position={{ lat: position.lat, lng: position.lng }} />
    </div>
  );
}
