import Image from 'next/image';
import closeIcon from '@/public/ic_close.svg';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import useReadNotificaitonStore from '@/store/useNotificationStore';

interface NotificationCardProps {
  id: number;
  content: string;
  createdAt: string;
  type: 'approved' | 'rejected' | 'all';
  onDelete?: () => void;
}

export default function NotificationCard({ id, content, createdAt, type, onDelete }: NotificationCardProps) {
  const { readIds, markAsRead } = useReadNotificaitonStore();
  const isRead = readIds.includes(id);

  const highlightContent = () => {
    if (type === 'approved') {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: content.replace('승인', `<span class="${isRead ? 'text-gray-400' : 'text-blue-600'}">승인</span>`),
          }}
        />
      );
    }
    if (type === 'rejected') {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: content.replace('거절', `<span class="${isRead ? 'text-gray-400' : 'text-red-600'}">거절</span>`),
          }}
        />
      );
    }
    return <span>{content}</span>;
  };

  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ko,
  });

  const handleClick = () => {
    if (!isRead) markAsRead(id);
  };

  return (
    <div
      onClick={handleClick}
      className={`border border-gray-200 rounded-md bg-white px-4 py-3 mx-auto max-w-[320px] ${
        isRead ? 'bg-gray-100 border-gray-100 text-gray-400' : 'bg-white'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 mt-1 pr-7 text-sm leading-relaxed">{highlightContent()}</div>
        <button onClick={onDelete} className="flex-shrink-0 mt-1 ml-2">
          <Image src={closeIcon} alt="닫기" width={20} height={20} />
        </button>
      </div>
      <div className="mt-2 text-xs text-gray-400">{timeAgo}분 전</div>
    </div>
  );
}
