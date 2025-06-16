'use client';
import { GetActivityDetailSuccessResponse } from '@/types/domain/activity/types';
import { useModalStore } from '@/store/modalStore';
import ModalImageViewer from './ModalImgViewer';
import ActivityPcImgView from './ActivityPCImgView';
import ActivityMobileImgView from './ActivityMobileImgView';

export default function ActivityImgSection({ data }: { data: GetActivityDetailSuccessResponse }) {
  const { openModal } = useModalStore();
  const allImages = [data.bannerImageUrl, ...data.subImages.map(img => img.imageUrl)];

  const handleImageClick = (index: number) => {
    openModal(() => <ModalImageViewer images={allImages} initialIndex={index} />);
  };

  return (
    <div className="w-[375px] h-[310px] md:w-[696px] lg:w-[900px] lg:h-[412px] md:mt-4 md:mb-8 lg:mb-[65px]">
      <ActivityPcImgView images={allImages} onImageClick={handleImageClick} />
      <ActivityMobileImgView images={allImages} onImageClick={handleImageClick} />
    </div>
  );
}
