import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function ActivityMapFooter({
  address,
  position,
}: {
  address: string;
  position: { lat: number; lng: number };
}) {
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('주소가 복사되었습니다!', {
        duration: 3000,
      });
    } catch (err) {
      alert('주소 복사에 실패했습니다.' + err);
    }
  };

  return (
    <>
      {/* 주소 영역 */}
      <div className="flex items-center mt-2 gap-[2px] flex-wrap">
        <Image src="/ic_location.svg" width={16} height={16} alt="지도마커" />
        <div className="text-md-regular text-nomad-black">{address}</div>
        <div className="ml-auto flex gap-2 items-center">
          <button onClick={handleCopyAddress} className="text-sm text-nomad-gray">
            주소 복사
          </button>
          <div className="border-l border-nomad-gray h-3" />
          <Link
            href={`https://map.kakao.com/link/to/${address},${position.lat},${position.lng}`}
            className="text-sm text-nomad-gray"
            target="_blank"
            rel="noreferrer"
          >
            길찾기
          </Link>
        </div>
      </div>
    </>
  );
}
