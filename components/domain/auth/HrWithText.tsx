interface HrWithTextProps {
  text: string;
}

export default function HrWithText({ text }: HrWithTextProps) {
  return (
    <div className="flex items-center mb-6 md:mb-10">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="flex-shrink text-md-regular text-gray-800 px-4">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}
