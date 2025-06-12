import Image from 'next/image';

export default function BannerImage() {
  return (
    <div className="relative w-full h-full">
      <Image
        src="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/profile_image/14-2_1916_1749485147419.jpeg"
        alt=""
        fill
        className="object-cover object-center"
      />
    </div>
  );
}
