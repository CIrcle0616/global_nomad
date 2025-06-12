//합계
interface PriceTotalProps {
  price: number;
  count: number;
}

export default function PriceTotal({ price, count }: PriceTotalProps) {
  return (
    <div className="flex justify-between mt-3">
      <span>총 합계</span>
      <span>₩ {(price * count).toLocaleString()}</span>
    </div>
  );
}
