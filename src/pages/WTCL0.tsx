import React from 'react'
import TableTwo from '../components/Tables/TableTwo'
import { FaPhoneAlt, FaPlus, FaWhatsapp } from 'react-icons/fa'
import { TbWorldWww } from 'react-icons/tb'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'
import CardDataStats from '../components/CardDataStats'
import { MdOutlinePendingActions } from 'react-icons/md'

const WTCL0 = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-3">
                <CardDataStats title="Total Application" total="3.456" rate="0.43%" levelUp>
                    <img src="images\gujarat.svg" alt="gujarat" className='w-[30px] h-[30px]' />
                    {/* <img src="publicimages/totalapplication.png" alt="" /> */}
                </CardDataStats>
                <CardDataStats title="Total Pending Scrutiny" total="45.2" rate="4.35%" levelUp>
                    <MdOutlinePendingActions size={35} />
                </CardDataStats>
                <CardDataStats title="Total Application" total="2.450" rate="2.59%" levelUp>
                    <FaPhoneAlt />
                    {/* <img src="https://swagat.gujarat.gov.in/img/swagat_png.png" alt="" className='w-[30px] h-[30px]' /> */}
                </CardDataStats>
                <CardDataStats title="Daily Avg Application" total="3.456" rate="0.95%" levelDown>
                    <FaPlus />
                </CardDataStats>
            </div>
            <div className="col-span-12 xl:col-span-12 rounded-xl w-[100%]">
                {/* <TableASR title={'Speech To Text'} /> */}
                <TableTwo />
            </div>
            <div className="col-span-12 xl:col-span-12 rounded-xl w-[100%] mt-5">
                {/* <TableOne title={'Sentiment'} /> */}
                {/* <TableSentiment title={'Sentiment'} /> */}
                {/* <TableTwo /> */}
            </div>
            <div className="col-span-12 xl:col-span-12 rounded-xl w-[100%] mt-5">
                {/* <TableScrutiny title={'Level0 Scrutiny'} /> */}
                {/* <TableTwo /> */}
            </div>
            <div className='flex justify-between items-center dark:bg-[#24303F] rounded-xl shadow-lg bg-[#FFFFFF] relative'>
                <div className='w-[25%] h-full'>
                    <div>
                        <h1 className='absolute top-10 text-2xl left-5'>Sources of Application</h1>
                    </div>
                    <div className='flex justify-between items-center dark:bg-[#24303F] p-5'>
                        <div>
                            {/* logo */}
                            <div>
                                <FaWhatsapp size={45} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <h1 className='text-2xl'>500</h1>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center dark:bg-[#24303F] p-5'>
                        <div>
                            {/* logo */}
                            <div>
                                <TbWorldWww size={45} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <h1 className='text-2xl'>
                                    100
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[65%] h-full rounded-xl  relative'>
                    <div className='text-center absolute mx-auto w-[100%] top-10'>
                        <h1 className='text-2xl'>Distribution of Application</h1>
                    </div>
                    <BarChart />
                </div>
            </div>
            <div className='h-full rounded-xl shadow-lg bg-[#FFFFFF] dark:bg-[#24303F]  mt-5'>
                <LineChart />
            </div>
        </>
    )
}

export default WTCL0