export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <aside>프로필 url에서 공유되는 레이아웃을 여기에 작성해주세요.</aside>
      <section>{children}</section>
    </div>
  );
}
