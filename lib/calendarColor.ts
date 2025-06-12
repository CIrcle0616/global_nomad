export function calendarColor(status: string): string {
  switch (status) {
    case '예약':
      return '#A7F3D0';

    case '승인':
      return '#FCA5A5';

    case '완료':
      return '#BDBDBD';

    default:
      return '#BDBDBD';
  }
}
