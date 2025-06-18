import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

interface ActivityShareModalProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

export default function ActivityShareModal() {
  const { closeModal, modalProps } = useModalStore();
  const { title, description, imageUrl, url } = modalProps as ActivityShareModalProps;

  const handleKakaoShare = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      toast.error('잠시 후 다시 시도해주세요.', {
        duration: 3000,
      });
      console.error('Kakao SDK is not initialized. Check layout and script loader.');
      return;
    }

    // 공유될 링크 생성
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '체험 보러가기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url); // 전달받은 url을 복사
      toast.success('링크가 복사되었습니다!', {
        duration: 3000,
      });
      closeModal();
    } catch (err) {
      toast.error('복사에 실패했어요 😢', {
        duration: 3000,
      });
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40" onClick={closeModal}>
      <div className="w-full max-w-md rounded-t-2xl bg-white py-6 px-8" onClick={e => e.stopPropagation()}>
        <div className="flex items-center mb-10">
          <div className="text-center text-lg font-semibold w-[360px]">공유하기</div>
          <Image
            src="/ic_close.svg"
            alt="닫기"
            width={24}
            height={24}
            onClick={closeModal}
            className="cursor-pointer"
          />
        </div>
        <div className="flex justify-around">
          <button onClick={handleKakaoShare} className="flex items-center gap-2">
            <Image src="/img_kakao.svg" alt="카카오톡" width={24} height={24} className="bg-yellow-300 rounded-full" />
            <span className="text-lg-medium">카카오톡</span>
          </button>
          <button onClick={handleCopyLink} className="flex items-center gap-2">
            <Image src="/ic_link_copy.svg" alt="링크복사" width={24} height={24} />
            <span className="text-lg-medium">링크복사</span>
          </button>
        </div>
      </div>
    </div>
  );
}
