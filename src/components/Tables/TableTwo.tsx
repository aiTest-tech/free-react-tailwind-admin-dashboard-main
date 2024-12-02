//@ts-nocheck
import { useEffect } from 'react';
import gsap from 'gsap';
import { useGetWtcAnalyticsQuery } from '../../features/wtcanalyticsApi';

const TableTwo = () => {
  const { data, isLoading, isError, error } = useGetWtcAnalyticsQuery();

  // GSAP Animation
  useEffect(() => {
    // Animate the table rows when they appear (fade in and slide up)
    gsap.fromTo(
      '.table-row',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
    );

    // Hover effect on table rows (scale and shadow)
    gsap.utils.toArray('.table-row').forEach((row) => {
      gsap.to(row, {
        scale: 1.05,
        ease: 'power2.out',
        paused: true,
        repeat: -1,
        yoyo: true,
        onStart: () => row.addEventListener('mouseenter', () => gsap.to(row, { scale: 1.05, boxShadow: '0px 4px 10px rgba(0,0,0,0.2)' })),
        onReverseComplete: () => row.addEventListener('mouseleave', () => gsap.to(row, { scale: 1, boxShadow: 'none' }))
      });
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="border border-stroke rounded-2xl bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-extrabold text-black dark:text-white">
          Total Approved
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-extrabold">Total Accepted</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-extrabold">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-extrabold">ML Approved</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-extrabold">ML Rejected</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-extrabold">Accuracy</p>
        </div>
      </div>

      <div
        className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 table-row"
      >
        <div className="col-span-3 flex items-center">
          <p className="text-sm text-black dark:text-white">
            {data?.total_accepted || 0} {/* Display total accepted from the API */}
          </p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="text-sm text-black dark:text-white">
            Total Accepted Category 
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm text-black dark:text-white">
            {data?.machine_accepted || 0} {/* Display machine accepted */}
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm text-black dark:text-white">
            {data?.machine_rejected || 0} {/* Display machine rejected */}
          </p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="text-sm text-meta-3">
            {data?.accuracy || 0} {/* Display accuracy */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TableTwo;
