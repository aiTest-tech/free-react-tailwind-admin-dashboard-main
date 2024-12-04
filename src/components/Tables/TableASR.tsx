// import { BRAND } from '../../types/brand';
// import BrandOne from '../../images/brand/brand-01.svg';
// import BrandTwo from '../../images/brand/brand-02.svg';
// import BrandThree from '../../images/brand/brand-03.svg';
// import BrandFour from '../../images/brand/brand-04.svg';
// import BrandFive from '../../images/brand/brand-05.svg';
// import { useGetAnalyticsDataQuery } from '../../features/analyticsApi';
// import { useEffect } from 'react';
// import { NavLink } from 'react-router-dom';

// interface RequestData {
//   title: String
// }

// const TableASR = (props: RequestData) => {
//   const { isLoading, isError, error, data } = useGetAnalyticsDataQuery();
//   useEffect(() => {
//     console.log(data);
//   })
//   return (
//     <div className="rounded-2xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//       <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
//         {props.title}
//       </h4>


//       <div className="flex flex-col">
//         <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
//           <div className="p-2.5 xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Project
//             </h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Total Requests
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Successful Requests
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Fail Request
//             </h5>
//           </div>

//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Success Rate
//             </h5>
//           </div>

//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Fail Rate
//             </h5>
//           </div>
//         </div>

//         {data?.asr.map((brand, key) => (
//           <div
//             className={`grid grid-cols-3 sm:grid-cols-6 ${key === brandData.length - 1
//               ? ''
//               : 'border-b border-stroke dark:border-strokedark'
//               }`}
//             key={key}
//           >
//             <div className="flex items-center gap-3 p-2.5 xl:p-5">
//               {/* <div className="flex-shrink-0">
//                 <img src={brand.logo} alt="Brand" />
//               </div> */}
//               <p className="hidden text-black dark:text-white sm:block">
//                 <NavLink to={`/project/${brand.project}`} >{brand.project}</NavLink>
//               </p>
//             </div>


//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-meta-3">{brand.total_requests}</p>
//             </div>

//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-black dark:text-white">{brand.success_request}</p>
//             </div>

//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="dark:text-red-600 text-red-600 font-extrabold ">{brand.failure_request}%</p>
//             </div>

//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black dark:text-green-500 font-extrabold">{brand.success_rate}%</p>
//             </div>

//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-red-800 dark:text-red-600 font-extrabold">{brand.failure_rate}%</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TableASR;





// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';

// interface RequestData {
//   title: String
// }

// const TableASR = (props: RequestData) => {
//   const [apiData, setApiData] = useState<any>(null);

//   useEffect(() => {
//     // Mocking the API response directly since no real API call is being made here.
//     const responseData = {
//       "asr": [
//         {
//           "project": "WTC",
//           "total_requests": 285,
//           "success_request": 283,
//           "success_rate": 99.3,
//           "failure_request": 2,
//           "failure_rate": 0.7,
//           "total_minutes_called": 1618
//         },
//         {
//           "project": "JS",
//           "total_requests": 14,
//           "success_request": 14,
//           "success_rate": 100.0,
//           "failure_request": 0,
//           "failure_rate": 0.0,
//           "total_minutes_called": 652
//         }
//       ]
//     };

//     // Set the API data to local state
//     setApiData(responseData);
//   }, []);

//   if (!apiData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="rounded-2xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//       <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
//         {props.title}
//       </h4>

//       <div className="flex flex-col">
//         <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
//           <div className="p-2.5 xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Project
//             </h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Total Requests
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Successful Requests
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Fail Request
//             </h5>
//           </div>

//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Success Rate
//             </h5>
//           </div>

//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Fail Rate
//             </h5>
//           </div>
//         </div>

//         {apiData?.asr.map((brand: any, key: number) => (
//           <div
//             className={`grid grid-cols-3 sm:grid-cols-6 ${key === apiData.asr.length - 1
//               ? ''
//               : 'border-b border-stroke dark:border-strokedark'
//               }`}
//             key={key}
//           >
//             <div className="flex items-center gap-3 p-2.5 xl:p-5">
//               <p className="hidden text-black dark:text-white sm:block">
//                 <NavLink to={`/project/${brand.project}`}>{brand.project}</NavLink>
//               </p>
//             </div>

//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-meta-3">{brand.total_requests}</p>
//             </div>

//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-black dark:text-white">{brand.success_request}</p>
//             </div>

//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="dark:text-red-600 text-red-600 font-extrabold">{brand.failure_request}%</p>
//             </div>

//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black dark:text-green-500 font-extrabold">{brand.success_rate}%</p>
//             </div>

//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-red-800 dark:text-red-600 font-extrabold">{brand.failure_rate}%</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TableASR;



import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface RequestData {
  title: String
}

const TableASR = (props: RequestData) => {
  const [apiData, setApiData] = useState<any>(null); // To store the fetched data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isError, setIsError] = useState(false); // Error state

  // Fetch the data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.10.2.179:5555/api/analytics/');
        const data = await response.json();

        // Assuming the 'asr' data is part of the response
        setApiData(data.asr);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Trigger fetch when component mounts
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <div className="rounded-2xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {props.title}
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Project
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total Requests
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Successful Requests
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Fail Request
            </h5>
          </div>

          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Success Rate
            </h5>
          </div>

          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Fail Rate
            </h5>
          </div>
        </div>

        {/* Map through the API data and display the table rows */}
        {apiData?.map((brand: any, key: number) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-6 ${key === apiData.length - 1
              ? ''
              : 'border-b border-stroke dark:border-strokedark'
              }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-xl text-black dark:text-white sm:block font-extrabold">
                <NavLink to={`/project/${brand.project}`}>{brand.project}</NavLink>
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3 text-xl font-extrabold">{brand.total_requests}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white text-xl font-extrabold">{brand.success_request}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="dark:text-red-600 text-red-600 font-extrabold text-xl">{brand.failure_request}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-green-500 font-extrabold text-xl">{brand.success_rate}%</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-red-800 dark:text-red-600 text-xl font-extrabold">{brand.failure_rate}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableASR;