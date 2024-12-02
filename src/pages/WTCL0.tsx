import React, { useEffect, useState } from 'react';
import TableTwo from '../components/Tables/TableTwo';
import { FaPhoneAlt, FaPlus, FaWhatsapp } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import CardDataStats from '../components/CardDataStats';
import { MdOutlinePendingActions } from 'react-icons/md';
import gsap from 'gsap';
import { useGetwtcCardAnalyticsQuery } from '../features/wtcCard';
import { useModeDistributionApiQuery } from '../features/modedistribution';

interface ModeInterface {
    model: string;
    count: number;
}

const WTCL0 = () => {
    // Fetch data using the custom hooks
    const { data: carddata, error, isLoading, isError } = useGetwtcCardAnalyticsQuery();
    const {
        data: modeldistribution,
        error: modelError,
        isLoading: modelisLoading,
        isError: modelisError,
    } = useModeDistributionApiQuery();

    useEffect(() => {
        // GSAP Animations
        gsap.fromTo(
            '.card-header',
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );
        gsap.fromTo(
            '.source-item',
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 1, ease: 'power2.out', stagger: 0.3 }
        );
        gsap.fromTo(
            '.bar-chart',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' }
        );
    }, []);

    // Handling loading and error states
    if (isLoading || modelisLoading) {
        return <div>Loading...</div>;
    }

    if (isError || modelisError) {
        return <div>Error occurred while fetching data!</div>;
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-3">
                {carddata && (
                    <>
                        <CardDataStats title="Total Application" total={carddata.total_applications} rate="0.43%" levelUp>
                            <img src="/public/images/application.svg" alt="" className="flex justify-center items-center w-[35px] h-[35px]" />
                        </CardDataStats>
                        <CardDataStats title="Total Pending Scrutiny" total={carddata.pending_applications} rate="4.35%" levelUp>
                            <MdOutlinePendingActions size={35} />
                        </CardDataStats>
                        <CardDataStats title="Today's Application" total={carddata.todays_applications} rate="2.59%" levelUp>
                            <FaPhoneAlt />
                        </CardDataStats>
                        <CardDataStats title="Daily Avg Application" total={carddata.daily_average_applications} rate="0.95%" levelDown>
                            <FaPlus />
                        </CardDataStats>
                    </>
                )}
            </div>
            <div className="col-span-12 xl:col-span-12 rounded-xl w-[100%]">
                <TableTwo />
            </div>

            {/* Sources of Application and Distribution of Application */}
            <div className="flex items-start rounded-xl shadow-lg bg-white dark:bg-[#24303F] relative p-6 mt-6">
                <div className="w-[35%] h-full relative mt-10">
                    <div className="card-header">
                        <h1 className="absolute text-xl font-extrabold text-black dark:text-white">Sources of Application</h1>
                    </div>
                    <div className="flex flex-col space-y-4 mt-10">
                        <div className="source-item flex justify-between items-center dark:bg-[#24303F] p-5 rounded-lg">
                            <div>
                                <FaWhatsapp size={45} className="text-green-500 dark:text-green-300" />
                            </div>
                            <div>
                                <h1 className="text-2xl text-black dark:text-white">
                                    {modeldistribution && modeldistribution.length > 2 && modeldistribution[0].count && (
                                        <h1 className="text-2xl text-black dark:text-white">{modeldistribution[0].count}</h1>
                                    )}
                                </h1>
                            </div>
                        </div>
                        <div className="source-item flex justify-between items-center dark:bg-[#24303F] p-5 rounded-lg">
                            <div>
                                <TbWorldWww size={45} className="text-blue-500 dark:text-blue-300" />
                            </div>
                            <div>
                                {modeldistribution && modeldistribution.length > 2 && modeldistribution[2].count && (
                                    <h1 className="text-2xl text-black dark:text-white">{modeldistribution[2].count}</h1>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[65%] h-full rounded-xl relative bar-chart">
                    <div className="text-center absolute mx-auto w-[100%] top-10">
                        <h1 className="text-xl font-extrabold text-black dark:text-white">Distribution of Application</h1>
                    </div>
                    <div className="mt-20">
                        <BarChart />
                    </div>
                </div>
            </div>

            <div className="h-full rounded-xl shadow-lg bg-[#FFFFFF] dark:bg-[#24303F] mt-5">
                <LineChart />
            </div>
        </>
    );
};

export default WTCL0;
