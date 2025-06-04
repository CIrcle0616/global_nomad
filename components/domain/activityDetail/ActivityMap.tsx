'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ActivityMap({ address }: { address: string }) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);

  // SDK 삽입 및 로딩 확인
  useEffect(() => {
    if (window.kakao?.maps) {
      setSdkLoaded(true);
      return;
    }

    const existingScript = document.querySelector('script[src^="https://dapi.kakao.com/v2/maps/sdk.js"]');

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        window.kakao.maps.load(() => {
          setSdkLoaded(true);
        });
      });
      return;
    }

    const script = document.createElement('script');
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=ee8b727eb9bd5a77a22b851eacd5d101&autoload=false&libraries=services';
    script.defer = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setSdkLoaded(true);
      });
    };
    document.head.appendChild(script);
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
    <div className="w-[327px] mx-auto h-[450px] md:w-[429px] md:h-[276px] lg:w-[789px] lg:h-[476px] my-10">
      <Map center={position} className="size-full" level={3}>
        <MapMarker position={position} />
      </Map>
      <div className="flex items-center mt-2 gap-1">
        <Image src="/ic_location.svg" width={16} height={16} alt="지도마커" />
        <div className="text-md-regular text-nomad-black ">{address}</div>
      </div>
    </div>
  );
}
