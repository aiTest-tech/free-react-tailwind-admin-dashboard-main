import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import { FaPhoneAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import TableTwo from '../../components/Tables/TableTwo';
import Loader from '../../common/Loader';
import TableASR from '../../components/Tables/TableASR';
import TableSentiment from '../../components/Tables/TableSentiment';
import TableScrutiny from '../../components/Tables/TableScrutiny';




const ECommerce: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="WRITE TO CMO" total="3.456" rate="0.43%" levelUp>
          <img src="images\gujarat.svg" alt="gujarat" className='w-[30px] h-[30px]' />
        </CardDataStats>
        <CardDataStats title="JANSAMWAD" total="45.2" rate="4.35%" levelUp>
          <FaPhoneAlt />
        </CardDataStats>
        <CardDataStats title="S.W.A.G.A.T" total="2.450" rate="2.59%" levelUp>
          <img src="https://swagat.gujarat.gov.in/img/swagat_png.png" alt="" className='w-[30px] h-[30px]' />
        </CardDataStats>
        <CardDataStats title="ADD PROJECT" total="3.456" rate="0.95%" levelDown>
          <FaPlus />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        {/* <ChartTwo /> */}
        {/* <ChartThree /> */}
        {/* <MapOne /> */}
        {/* <ChatCard /> */}
      </div>
      <div className="col-span-12 xl:col-span-12 rounded-xl w-[100%]">
        <TableASR title={'Speech To Text'} />
        {/* <TableTwo /> */}
      </div>
      <div className="col-span-12 xl:col-span-12 rounded-xl w-[100%] mt-5">
        {/* <TableOne title={'Sentiment'} /> */}
        <TableSentiment title={'Sentiment'} />
        {/* <TableTwo /> */}
      </div>
      <div className="col-span-12 xl:col-span-12 rounded-xl w-[100%] mt-5">
        <TableScrutiny title={'Scrutiny'} />
        {/* <TableTwo /> */}
      </div>
    </>
  );
};

export default ECommerce;
