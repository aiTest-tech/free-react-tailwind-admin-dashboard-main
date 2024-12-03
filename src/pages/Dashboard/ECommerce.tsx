// //@ts-nocheck
// import React from 'react';
// import CardDataStats from '../../components/CardDataStats';
// import ChartOne from '../../components/Charts/ChartOne';
// import ChartThree from '../../components/Charts/ChartThree';
// import ChartTwo from '../../components/Charts/ChartTwo';
// import ChatCard from '../../components/Chat/ChatCard';
// import MapOne from '../../components/Maps/MapOne';
// import TableOne from '../../components/Tables/TableOne';
// import { FaPhoneAlt } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa";
// import TableTwo from '../../components/Tables/TableTwo';
// import Loader from '../../common/Loader';
// import TableASR from '../../components/Tables/TableASR';
// import TableSentiment from '../../components/Tables/TableSentiment';
// import TableScrutiny from '../../components/Tables/TableScrutiny';
// import { MdOutlinePendingActions } from "react-icons/md";
// import { FaWhatsapp } from "react-icons/fa6";
// import { FaInternetExplorer } from "react-icons/fa6";
// import BarChart from '../../components/BarChart';
// import { TbWorldWww } from "react-icons/tb";
// import LineChart from '../../components/LineChart';

// const ECommerce: React.FC = () => {
//   return (
//     <>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
//         <CardDataStats title="Write To CMO" total="1041" rate="0.43%" levelUp>
//           <img src="images\gujarat.svg" alt="gujarat" className='w-[30px] h-[30px]' />
//           {/* <img src="publicimages/totalapplication.png" alt="" /> */}
//         </CardDataStats>
//         <CardDataStats title="Jansanvad" total="72" rate="4.35%" levelUp>
//           <MdOutlinePendingActions size={35} />
//         </CardDataStats>
//         <CardDataStats title="S.W.A.G.A.T" total="0" rate="2.59%" levelUp>
//           <FaPhoneAlt />
//           {/* <img src="https://swagat.gujarat.gov.in/img/swagat_png.png" alt="" className='w-[30px] h-[30px]' /> */}
//         </CardDataStats>
//         <CardDataStats title="Add Project" total="" rate="0.95%" levelDown>
//           <FaPlus />
//         </CardDataStats>
//       </div>

//       {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
//       </div> */}
//       {/* <div className="mt-2 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
//       </div> */}
//       <div className='mb-2 mt-2'>
//         <TableASR title={'Speech to text'} />
//       </div>
//       <div className='mb-2'>
//         <TableSentiment title={'Sentiment'} />
//       </div>
//       <div className='mb-2'>
//         <TableScrutiny title={'Scrutiny'} />
//       </div>
//     </>
//   );
// };

// export default ECommerce;

//@ts-nocheck
import React from 'react';
import { useGetProjectCardDataQuery } from '../../features/projectcardApi';
import CardDataStats from '../../components/CardDataStats';
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import TableASR from '../../components/Tables/TableASR';
import TableSentiment from '../../components/Tables/TableSentiment';
import TableScrutiny from '../../components/Tables/TableScrutiny';

const ECommerce: React.FC = () => {
  // Use the hook to fetch data from the API
  const { data: projectdata, error, isLoading } = useGetProjectCardDataQuery();

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error.message || 'An error occurred'}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {projectdata && (
          <>
            <CardDataStats title="Write To CMO" total={projectdata.wtc}  rate="0.43%" levelUp>
            <img src="images\gujarat.svg" alt="gujarat" className='w-[30px] h-[30px]' />
            </CardDataStats>
            <CardDataStats title="Jansanvad" total="0" rate="4.35%" levelUp>
              <MdOutlinePendingActions size={35} />
            </CardDataStats>
            <CardDataStats title="S.W.A.G.A.T" total="0" rate="2.59%" levelUp>
              <FaPhoneAlt />
            </CardDataStats>
            <CardDataStats title="Add Project" total="" rate="0.95%" levelDown>
              <FaPlus />
            </CardDataStats>
          </>
        )}
      </div >
      
      <div className='mb-2 mt-2'>
        <TableASR title={'Speech to text'} />
      </div>
      <div className='mb-2'>
        <TableSentiment title={'Sentiment'} />
      </div>
      <div className='mb-2'>
        <TableScrutiny title={'Scrutiny'} />
      </div>
    </>
  );
};

export default ECommerce;
