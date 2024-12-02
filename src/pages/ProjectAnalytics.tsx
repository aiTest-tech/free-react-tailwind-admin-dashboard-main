import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useGetWtcsDataQuery } from '../features/wtcfetchApi';
import Loader from '../common/Loader';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface ComingSoonModalProps {
  handleCloseModal: () => void;
  level0Scrutiny: 'Accept' | 'Reject' | null;
  handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: number;
  name: string;
  occupation: string;
  address: string;
  phone: string;
  email: string;
  district_corporation: string;
  taluka_zone: string;
  village_area: string;
  department: string;
  subject: string;
  message: string;
  type: string
}

interface ClickedRowDataInterface {
  id: number;
  type: string;
  lang: string;
  project: number;
  user: number;
  name: string;
  occupation: string;
  address: string;
  phone: string;
  district_corporation: string;
  taluka_zone: string;
  village_area: string;
  subject: string;
  message: string;
  department: string;
  email: string;
  mode: string;
  created_at: string;
  lo_sc: string;
  sentiment_cal_gra: string;
  sentiment_cal_pol: string;
  depr_rout: string;
}

const ComingSoonModal = (props: ComingSoonModalProps) => (
  <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-100 mt-10 sm:w-screen">
    <div className="bg-white text-black p-6 rounded-lg w-2/3 max-w-3xl shadow-2xl overflow-y-auto max-h-[85vh]">
      <div className='flex justify-between items-center pb-2'>
        <h1 className='w-[50px] h-[50px] rounded-full bg-black text-white flex justify-center items-center text-2xl'>{props.id}</h1>
        <h1 className='text-xl font-extrabold'>Type: <span className='text-orange-600'>{props.type}</span></h1>
      </div>
      <h1 className="text-4xl font-bold uppercase text-indigo-600 mb-6">Personal Details</h1>
      <div className='w-full h-[2px] bg-slate-800 mt-2'></div>
      <div>
        <div>
          <div className='flex justify-start items-center'>
            <h1 className='font-extrabold text-2xl px-2 min-w-[150px]'>Name:</h1>
            <h2 className=' px-2 text-xl'>{props.name}</h2>
          </div>
          <div className='flex justify-start items-center'>
            <h1 className='font-extrabold text-2xl px-2 min-w-[150px]'>Occupation:</h1>
            <h2 className=' px-2 text-xl'>{props.occupation}</h2>
          </div>
          <div className='flex justify-start items-center'>
            <h1 className='font-extrabold text-2xl px-2 min-w-[150px]'>Address:</h1>
            <h2 className=' px-2 text-xl'>{props.address}</h2>
          </div>
          <div className='flex justify-start items-center'>
            <h1 className='font-extrabold text-2xl px-2 min-w-[150px]'>Phone:</h1>
            <h2 className=' px-2 text-xl'>{props.phone}</h2>
          </div>
          <div className='flex justify-start items-center'>
            <h1 className='font-extrabold text-2xl px-2 min-w-[150px]'>District:</h1>
            <h2 className=' px-2 text-xl'>{props.district_corporation}</h2>
          </div>
          <div className='flex justify-start items-center'>
            <h1 className='font-extrabold text-2xl px-2 min-w-[150px]'>Taluka:</h1>
            <h2 className=' px-2 text-xl'>{props.taluka_zone}</h2>
          </div>
          <div className='flex justify-start items-center'>
            <h1 className='font-extrabold text-2xl px-2 min-w-[150px]'>Village:</h1>
            <h2 className=' px-2 text-xl'>{props.village_area}</h2>
          </div>
        </div>
      </div>
      <div className='w-full h-[2px] bg-slate-800 mt-2'></div>
      <div className='flex justify-start items-start'>
        <h1 className='font-extrabold text-2xl px-2 min-w-[150px]'>Department:</h1>
        {props.department === null ? <><div className="w-[50px] h-[3px] bg-red"></div></> : <h2 className=' px-2 text-xl max-w[500px]'>{props.department}</h2>}
      </div>
      <div className='w-full h-[2px] bg-slate-800 mt-2'></div>

      <div className='flex justify-start items-center'>
        <h1 className='font-extrabold text-2xl px-2 min-w-[150px]'>Subject:</h1>
        <h2 className=' px-2 text-xl'>{props.subject}</h2>
      </div>
      <div className='flex justify-start items-start'>
        <h1 className='font-extrabold text-2xl px-2 min-w-[150px]'>Message:</h1>
        <h2 className=' px-2 text-xl'>{props.message}</h2>
      </div>
      <div>
        <h1 className="text-4xl font-bold uppercase text-indigo-600 mb-6 mt-3">Level-0 Scrutiny</h1>
        <div className='w-full h-[2px] bg-slate-800 mt-2'></div>
        <div className='flex justify-between max-w-[200px]'>
          <div>
            <input
              type="radio"
              id="Accept"
              name="level0Scrutiny"
              value="Accept"
              checked={props.level0Scrutiny === 'Accept'} // Set checked based on prop
              onChange={props.handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="Accept" className="text-xl">Accept</label>
          </div>
          <div>
            <input
              type="radio"
              id="Reject"
              name="level0Scrutiny"
              value="Reject"
              checked={props.level0Scrutiny === 'Reject'} // Set checked based on prop
              onChange={props.handleRadioChange}
              className="mr-2"
            />
            <label htmlFor="Reject" className="text-xl">Reject</label>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold uppercase text-indigo-600 mb-6 mt-3">Machine Learning Findings</h1>
          <div className='w-full h-[2px] bg-slate-800 mt-2'></div>
        </div>

      </div>
      <div className="mt-6 flex justify-center">
        <button onClick={props.handleCloseModal} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300">Close</button>
      </div>
    </div>
  </div>
);


const ProjectAnalytics = () => {
  const { data, error, isLoading } = useGetWtcsDataQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedRowData, setClickedRowData] = useState<ClickedRowDataInterface | null>(null);
  const [level0Scrutiny, setLevel0Scrutiny] = useState<'Accept' | 'Reject' | null>(null);

  const handleRowClick = (event: any) => {
    const rowData = event.data;
    setClickedRowData(rowData);
    console.log("brijesh clickeRowdata", rowData);
    setLevel0Scrutiny(rowData.lo_sc || ''); // Set default value
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setClickedRowData(null);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("brijesh event target", e.target.value);
    setLevel0Scrutiny(e.target.value as 'Accept' | 'Reject');
  };

  // const columnDefs = useMemo(() => [
  //   { headerName: '', checkboxSelection: true, width: 50 },
  //   { headerName: "ID", width: 80, field: 'id', sortable: true },
  //   { headerName: 'Level 0 Scrutiny', field: 'lo_sc', sortable: true, filter: true },
  //   { headerName: 'Sentiment Polarity', field: 'sentiment_cal_pol', sortable: true, filter: true },
  //   { headerName: 'Subject', field: 'subject', sortable: true, filter: true },
  //   { headerName: 'Message', field: 'message', sortable: true, filter: true },
  //   { headerName: 'Sentiment Gravity', field: 'sentiment_cal_gra', sortable: true },
  //   { headerName: 'Department Routing', field: 'depr_rout', sortable: true },
  //   { headerName: 'Phone', field: 'phone', sortable: true },
  //   { headerName: 'Email', field: 'email', sortable: true },
  //   { headerName: 'Created At', field: 'created_at', sortable: true, filter: true },
  // ], []);

  const columnDefs = useMemo(() => [
    {
      headerName: '',
      checkboxSelection: true,
      width: 50
    },
    {
      headerName: "id",
      width: 80,
      field: 'id',
      sortable: true,
    },
    {
      headerName: 'Level 0 Scrutiny',
      field: 'lo_sc',
      sortable: true,
      filter: true,
      cellClassRules: {
        'text-green-500': (params) => params.value && params.value.toLowerCase().trim() === 'accept',
        'text-red-500': (params) => params.value && params.value.toLowerCase().trim() === 'reject',
      },
    },
    {
      headerName: 'Sentiment Polarity',
      field: 'sentiment_cal_pol',
      sortable: true,
      filter: true,
      width: 160,
      cellClassRules: {
        'text-green-500': (params) => params.value && params.value.toLowerCase().trim() === 'positive',
        'text-red-500': (params) => params.value && params.value.toLowerCase().trim() === 'negative',
        'text-gray-500': (params) => params.value && params.value.toLowerCase().trim() === 'neutral',
      },
    },
    {
      headerName: 'Subject',
      field: 'subject',
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: 'Message',
      field: 'message',
      sortable: true,
      filter: true,
      width: 500,
      // Rendering the button in the Message column
      cellRendererFramework: (params: any) => {
        return (
          <button
            className="text-blue-500 underline"
            onClick={() => handleRowClick(params)} // Open the modal with full row data
          >
            View Details
          </button>
        );
      },
    },
    {
      headerName: 'Sentiment Gravity',
      field: 'sentiment_cal_gra',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Department Routing',
      field: 'depr_rout',
      sortable: true,
      filter: true,
    },
    {
      headerName: "phone",
      field: 'phone',
      sortable: true,
      width: 200
    },
    {
      headerName: "email",
      field: 'email',
      sortable: true,
      width: 200
    },
    {
      headerName: 'Created At',
      field: 'created_at',
      sortable: true,
      filter: true,
    },
  ], [])

  if (isLoading) return <div><Loader /></div>;
  if (error) return <div>Error fetching data</div>;
  if (!data || data.length === 0) {
    return (
      <div className="w-full text-center mt-20">
        <h2 className="text-3xl text-indigo-600 font-bold">No data available.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#24303F]">
      <div className="flex flex-grow">
        <main className=" w-full">
          {/* <div className="ag-theme-alpine" style={{ height: '600px' }}>
            <AgGridReact
              rowData={data}
              columnDefs={columnDefs}
              pagination
              paginationPageSize={10}
              domLayout="autoHeight"
              onRowClicked={handleRowClick}
            />
          </div> */}
          <div className="bg-[#24303F] text-white">
            <div className="ag-theme-alpine-dark" style={{ height: '300px', width: '100%' }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={data as RowData[]}
                pagination={true}
                paginationPageSize={10}
                domLayout="autoHeight"
                onRowClicked={handleRowClick} // Register row click handler
              />
            </div>
          </div>

          {isModalOpen && (
            <ComingSoonModal
              handleCloseModal={handleCloseModal}
              level0Scrutiny={level0Scrutiny}
              handleRadioChange={handleRadioChange}
              id={clickedRowData?.id}
              name={clickedRowData?.name}
              occupation={clickedRowData?.occupation}
              address={clickedRowData?.address}
              phone={clickedRowData?.phone}
              email={clickedRowData?.email}
              district_corporation={clickedRowData?.district_corporation}
              taluka_zone={clickedRowData?.taluka_zone}
              village_area={clickedRowData?.village_area}
              department={clickedRowData?.department}
              type={clickedRowData?.type}
              subject={clickedRowData?.subject}
              message={clickedRowData?.message}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ProjectAnalytics;
