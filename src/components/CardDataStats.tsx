import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  children,
}) => {
  return (
    <div className="max-w-xs rounded-3xl border border-gray-200 bg-white py-6 px-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl dark:border-gray-700 dark:bg-gray-800 dark:hover:scale-105 dark:hover:shadow-3xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg dark:from-indigo-700 dark:to-blue-800">
        {children}
      </div>

      <div className="mt-6 text-center">
        <h4 className="text-3xl font-semibold text-gray-900 dark:text-white">
          {total}
        </h4>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
      </div>
    </div>


  );
};

export default CardDataStats;
