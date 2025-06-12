'use client';

import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { EventClickArg, EventInput } from '@fullcalendar/core';
import { calendarColor } from '@/lib/calendarColor';
import CalendarContent from './CalendarContent';

interface ScheduleItem {
  date: string;
  status: string;
  count: number;
}

interface Props {
  schedule: ScheduleItem[];
  activityId: number;
  onClickItem?: (date: string, status: '예약' | '승인' | '완료') => void;
}

export default function Calendar({ schedule, onClickItem }: Props) {
  const events: EventInput[] = schedule.map(item => ({
    title: `${item.status} ${item.count}`,
    date: item.date,
    color: calendarColor(item.status),
  }));

  const handleEventClick = (arg: EventClickArg) => {
    const [status] = arg.event.title.split(' ');
    const date = arg.event.startStr;

    if (status === '예약' || status === '승인' || status === '완료') {
      onClickItem?.(date, status as '예약' | '승인' | '완료');
    }
  };

  return (
    <FullCalendar
      height="auto"
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale="ko"
      events={events}
      eventContent={eventInfo => <CalendarContent eventInfo={eventInfo} />}
      eventClick={handleEventClick}
      headerToolbar={{ start: 'prev', center: 'title', end: 'next' }}
      fixedWeekCount={false}
    />
  );
}
