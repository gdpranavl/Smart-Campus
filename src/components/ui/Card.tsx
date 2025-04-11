"use client";

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  );
}
