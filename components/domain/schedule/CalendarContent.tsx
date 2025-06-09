//예약, 완료, 승인칸 ui
import { EventContentArg } from '@fullcalendar/core';

interface CalendarContentProps {
  eventInfo: EventContentArg;
}

export default function CalendarContent({ eventInfo }: CalendarContentProps) {
  const bgColor = eventInfo.event.backgroundColor;
  const title = eventInfo.event.title;

  return (
    <div
      className="text-white text-xs px-2  py-[2px] rounded md-1 w-fit max-w-full- break-keep"
      style={{ backgroundColor: bgColor }}
    >
      {title}
    </div>
  );
}
