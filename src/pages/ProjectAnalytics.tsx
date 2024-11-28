import React from 'react'
import { useParams } from 'react-router-dom';
import Chart from './Chart';
import { useGetWtcsDataQuery } from '../features/wtcfetchApi';

const ProjectAnalytics = () => {
  const params = useParams()
  console.log(params);
  const { data, error, isLoading } = useGetWtcsDataQuery()
  console.log(data);

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                
              </th>
              <th scope="col" className="px-6 py-3">
                Subject
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Level 0 Scrutiny
              </th>
              <th scope="col" className="px-6 py-3">
                Sentiment Gravity
              </th>
              <th scope="col" className="px-6 py-3">
                Sentiment Polarity
              </th>
              <th scope="col" className="px-6 py-3">
                Department Routing
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data?.map((item, index) => (
                <>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className='px-2'>
                      <input type="checkbox" name="" id="" />
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.subject}
                    </th>
                    <td className="px-6 py-4">{item.message}</td>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">{item.lo_sc}</td>
                    <td className="px-6 py-4">{item.sentiment_cal_gra}</td>
                    <td className="px-6 py-4">{item.sentiment_cal_pol}</td>
                    <td className="px-6 py-4">{item.depr_rout}</td>
                    <td className="px-6 py-4">{item.created_at}</td>
                  </tr>
                </>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ProjectAnalytics