// import { BRAND } from '../../types/brand';
// import { useGetAnalyticsDataQuery } from '../../features/analyticsApi';
// import { useEffect } from 'react';

// interface RequestData {
//   title: string;
// }

// const TableScrutiny = (props: RequestData) => {
//   const { isLoading, isError, error, data } = useGetAnalyticsDataQuery(); // Assuming it fetches both sentiment and l1_scrutiny

//   useEffect(() => {
//     console.log(data); // To inspect the structure of the fetched data
//   }, [data]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error: {error?.message}</div>;
//   }

//   return (
//     <div className="rounded-2xl border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//       <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">{props.title}</h4>

//       <div className="flex flex-col">
//         <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
//           <div className="p-2.5 xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Project</h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Total Requests</h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Successful Requests</h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Fail Request</h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Success Rate</h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Fail Rate</h5>
//           </div>
//         </div>

//         {/* Render data for both sentiment and l1_scrutiny */}
//         {[...data?.sentiment, ...data?.l1_scrutiny].map((brand, key) => (
//           <div
//             className={`grid grid-cols-3 sm:grid-cols-6 ${
//               key === data?.sentiment.length + data?.l1_scrutiny.length - 1
//                 ? ''
//                 : 'border-b border-stroke dark:border-strokedark'
//             }`}
//             key={key}
//           >
//             <div className="flex items-center gap-3 p-2.5 xl:p-5">
//               <p className="hidden text-black dark:text-white sm:block">{brand.project}</p>
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

// export default TableScrutiny;



import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface RequestData {
  title: String
}

const TableScrutiny = (props: RequestData) => {
  const [apiData, setApiData] = useState<any>(null); // To store the fetched sentiment data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isError, setIsError] = useState(false); // Error state

  // Fetch the sentiment data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.10.2.179:5555/api/analytics/');
        const data = await response.json();
        // Assuming the 'sentiment' data is part of the response
        setApiData(data.l1_scrutiny);
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

        {/* Map through the API sentiment data and display the table rows */}
        {apiData?.map((brand: any, key: number) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-6 ${key === apiData.length - 1
              ? ''
              : 'border-b border-stroke dark:border-strokedark'
              }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block text-xl font-extrabold">
                <NavLink to={`/project/${brand.project}`}>{brand.project === 'WTC' && 'Write To CMO'}</NavLink>
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3 text-xl font-extrabold">{brand.total_requests}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white text-xl font-extrabold">{brand.success_request}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="dark:text-red-600 text-red-600 text-xl font-extrabold">{brand.failure_request}</p>
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

export default TableScrutiny;