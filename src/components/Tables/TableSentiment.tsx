import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface RequestData {
  title: String;
}

const TableSentiment = (props: RequestData) => {
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
        setApiData(data.sentiment);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Trigger fetch when component mounts
  }, []);

  // Skeleton placeholder for the table
  const renderSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(2)].map((_, index) => (
        <div
          className="grid grid-cols-3 sm:grid-cols-6 border-b border-stroke dark:border-strokedark"
          key={index}
        >
          {[...Array(6)].map((_, colIndex) => (
            <div
              className="p-2.5 xl:p-5 flex justify-center items-center"
              key={colIndex}
            >
              <div className="w-full h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

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

        {isLoading
          ? renderSkeleton() // Show skeleton placeholder when loading
          : apiData?.map((brand: any, key: number) => (
              <div
                className={`grid grid-cols-3 sm:grid-cols-6 ${
                  key === apiData.length - 1
                    ? ''
                    : 'border-b border-stroke dark:border-strokedark'
                }`}
                key={key}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <p className="hidden text-black dark:text-white sm:block text-xl font-extrabold">
                    <NavLink to={`/project/${brand.project}`}>
                      {brand.project}
                    </NavLink>
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3 text-xl font-extrabold">
                    {brand.total_requests}
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="text-black dark:text-white text-xl font-extrabold">
                    {brand.success_request}
                  </p>
                </div>

                <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                  <p className="dark:text-red-600 text-red-600 text-xl font-extrabold">
                    {brand.failure_request}
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-green-500 text-xl font-extrabold">
                    {brand.success_rate}%
                  </p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-red-800 dark:text-red-600 text-xl font-extrabold">
                    {brand.failure_rate}%
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TableSentiment;
