export const statusMap: { [key: string]: { text: string; color: string } } = {
  pending: { text: '예약 완료', color: 'text-blue-300' },
  canceled: { text: '예약 취소', color: 'text-gray-800' },
  confirmed: { text: '예약 승인', color: 'text-orange-500' },
  declined: { text: '예약 거절', color: 'text-red-500' },
  completed: { text: '체험 완료', color: 'text-gray-800' },
};
