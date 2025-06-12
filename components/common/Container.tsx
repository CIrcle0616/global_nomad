interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = '' }: ContainerProps) {
  return <div className={`w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-0 ${className}`}>{children}</div>;
}
