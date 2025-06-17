import ClickableImage from '@/components/domain/activityDetail/ClickableImage';

interface ActivityPcViewProps {
  images: string[];
  onImageClick: (index: number) => void;
}

export default function ActivityPcImgView({ images, onImageClick }: ActivityPcViewProps) {
  if (images.length === 0) return null;

  const [bannerImage, ...subImages] = images;
  const subImageCount = subImages.length;

  const renderSubImages = () => {
    // 서브 이미지가 4개 이상이면 2x2 그리드로 고정
    if (subImageCount >= 4) {
      return (
        <div className="grid grid-cols-2 gap-2 h-full">
          {subImages.slice(0, 4).map((src, idx) => (
            <ClickableImage
              key={src}
              src={src}
              alt={`서브 이미지 ${idx + 1}`}
              index={idx + 1}
              onImageClick={onImageClick}
            />
          ))}
        </div>
      );
    }

    // 1, 2, 3개일 때 Flexbox로 처리
    return (
      <div className="flex flex-col gap-2 h-full">
        {/* 첫 번째 서브 이미지 (1, 2, 3개일 때 모두 존재) */}
        <div className="flex-1 min-h-0">
          <ClickableImage src={subImages[0]} alt="서브 이미지 1" index={1} onImageClick={onImageClick} />
        </div>

        {/* 2, 3개일 때 추가되는 하단 영역 */}
        {subImageCount > 1 && (
          <div className="flex-1 min-h-0 flex gap-2">
            {/* 두 번째 서브 이미지 */}
            <div className="flex-1">
              <ClickableImage src={subImages[1]} alt="서브 이미지 2" index={2} onImageClick={onImageClick} />
            </div>
            {/* 세 번째 서브 이미지 */}
            {subImageCount > 2 && (
              <div className="flex-1">
                <ClickableImage src={subImages[2]} alt="서브 이미지 3" index={3} onImageClick={onImageClick} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="hidden md:flex gap-2 w-full h-full">
      {/* 대표 이미지 */}
      <div className={subImageCount > 0 ? 'w-[60%]' : 'w-full'}>
        <ClickableImage src={bannerImage} alt="대표 이미지" index={0} onImageClick={onImageClick} />
      </div>

      {/* 서브 이미지 */}
      {subImageCount > 0 && <div className="w-[40%] h-full">{renderSubImages()}</div>}
    </div>
  );
}
