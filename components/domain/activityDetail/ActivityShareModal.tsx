'use client';

import { useModalStore } from '@/store/modalStore';
import Image from 'next/image';

export default function ActivityShareModal() {
  const { closeModal } = useModalStore();
  // const imageUrl = 'https://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png';
  // 활동 ID 추출
  // const activityId = url.split('/').pop();

  // // 개발환경에서도 배포 도메인 기준으로 공유 링크 생성
  // const baseUrl =
  //   process.env.NODE_ENV === 'development' ? 'https://global-nomad-black.vercel.app' : window.location.origin;

  // const shareLink = `${baseUrl}/activities/${activityId}`;

  // Kakao SDK 초기화
  // useEffect(() => {
  //   if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
  //     window.Kakao.init('1d0b99e50b29c799009a5eac4306aaf7');
  //   }
  // }, []);

  // 모바일 판별
  // const isMobile = () =>
  //   typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  const handleKakaoShare = () => {
    // if (isMobile()) {
    //   // 모바일 환경 → Kakao JS SDK
    //   if (!window.Kakao) return;
    //   window.Kakao.Share.sendDefault({
    //     objectType: 'feed',
    //     content: {
    //       title,
    //       description,
    //       imageUrl,
    //       link: {
    //         mobileWebUrl: shareLink,
    //         webUrl: shareLink,
    //       },
    //     },
    //     buttons: [
    //       {
    //         title: '웹에서 보기',
    //         link: {
    //           mobileWebUrl: shareLink,
    //           webUrl: shareLink,
    //         },
    //       },
    //     ],
    //   });
    // } else {
    //   // PC 환경 → sharer.kakao.com
    //   const appKey = '1d0b99e50b29c799009a5eac4306aaf7';
    //   const kakaoShareUrl = `https://sharer.kakao.com/picker/link?app_key=${appKey}&template_json=${encodeURIComponent(
    //     JSON.stringify({
    //       objectType: 'feed',
    //       content: {
    //         title,
    //         description,
    //         imageUrl,
    //         link: {
    //           webUrl: shareLink,
    //           mobileWebUrl: shareLink,
    //         },
    //       },
    //       buttons: [
    //         {
    //           title: '웹에서 보기',
    //           link: {
    //             webUrl: shareLink,
    //             mobileWebUrl: shareLink,
    //           },
    //         },
    //       ],
    //     }),
    //   )}`;
    // console.log(kakaoShareUrl);

    // window.open(kakaoShareUrl, '_blank', 'width=600,height=700');
    alert('카카오 공유하기!');
    closeModal();
  };

  // };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다!');
      closeModal();
    } catch (err) {
      alert('복사에 실패했어요 😢');
      console.log(err);
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
