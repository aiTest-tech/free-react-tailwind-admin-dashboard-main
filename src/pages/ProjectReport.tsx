import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useGetWtcsDataQuery } from '../features/wtcfetchApi';
import Loader from '../common/Loader';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


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
  type: string;
}

const ComingSoonModal = (props: ComingSoonModalProps) => {
  const [postDisabled, setPostDisabled] = useState(true); // Button disabled by default
  const [radioChangeState, setRadioChangeState] = useState<'Accept' | 'Reject' | null>(null); // Local state for radio button value

  // Handle radio button change to activate the Submit button and update the radioChangeState
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioChangeState(e.target.value as 'Accept' | 'Reject'); // Update state based on selected radio button value
    setPostDisabled(false); // Enable Submit button when a radio button is selected
    // props.handleRadioChange(e); // Call the existing radio change handler passed via props (if needed)
  };

  const handleSubmit = async () => {
    if (!radioChangeState) return; // Ensure a radio button is selected

    const requestBody = {
      id: props.id, // Pass the ID from props
      lo_sc_hu: radioChangeState, // Pass the selected radio button value
    };

    try {
      const response = await fetch('http://10.10.2.179:5555/api/primary-scrutiny-done/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      const data = await response.json();
      console.log('Response:', data); // Handle successful response

      // Optionally close the modal or handle post-submit actions
      props.handleCloseModal();
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting the form');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-100 mt-10 sm:w-screen">
      <div className="bg-white text-black p-6 rounded-lg w-2/3 max-w-3xl shadow-2xl overflow-y-auto max-h-[85vh]">
        <div className="flex justify-between items-center pb-2">
          <h1 className="w-[50px] h-[50px] rounded-full bg-black text-white flex justify-center items-center text-2xl">{props.id}</h1>
          <h1 className="text-xl font-extrabold">Type: <span className="text-orange-600">{props.type}</span></h1>
        </div>

        {/* Personal Details Section */}
        <h1 className="text-4xl font-bold uppercase text-indigo-600 mb-6">Personal Details</h1>
        <div className="w-full h-[2px] bg-slate-800 mt-2"></div>
        <div>
          <div className="flex justify-start items-center">
            <h1 className="font-extrabold text-2xl px-2 min-w-[150px]">Name:</h1>
            <h2 className=" px-2 text-xl">{props.name}</h2>
          </div>
          {/* Other personal details fields (Occupation, Address, etc.) */}
        </div>

        {/* Department, Subject, and Message Section */}
        <div className="w-full h-[2px] bg-slate-800 mt-2"></div>
        <div className="flex justify-start items-start">
          <h1 className="font-extrabold text-2xl px-2 min-w-[150px]">Department:</h1>
          {props.department === null ? <><div className="w-[50px] h-[3px] bg-red"></div></> : <h2 className=" px-2 text-xl max-w[500px]">{props.department}</h2>}
        </div>

        <div className="w-full h-[2px] bg-slate-800 mt-2"></div>
        <div className="flex justify-start items-center">
          <h1 className="font-extrabold text-2xl px-2 min-w-[150px]">Subject:</h1>
          <h2 className=" px-2 text-xl">{props.subject}</h2>
        </div>
        <div className="flex justify-start items-start">
          <h1 className="font-extrabold text-2xl px-2 min-w-[150px]">Message:</h1>
          <h2 className=" px-2 text-xl">{props.message}</h2>
        </div>

        {/* Level-0 Scrutiny Section */}
        <h1 className="text-4xl font-bold uppercase text-indigo-600 mb-6 mt-3">
          Level-0 Scrutiny <span className={`${props.level0Scrutiny === 'Accept' ? 'text-green-500 text-xl' : 'text-red-600 text-xl'}`}>
            {props.level0Scrutiny}
          </span>
        </h1>
        <div className="w-full h-[2px] bg-slate-800 mt-2"></div>
        <div className="flex justify-between max-w-[200px]">
          <div>
            <input
              type="radio"
              id="Accept"
              name="level0Scrutiny"
              value="Accept"
              checked={radioChangeState === 'Accept'} // Bind to state
              onChange={handleRadioChange} // Handle radio change
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
              checked={radioChangeState === 'Reject'} // Bind to state
              onChange={handleRadioChange} // Handle radio change
              className="mr-2"
            />
            <label htmlFor="Reject" className="text-xl">Reject</label>
          </div>
        </div>

        {/* Machine Learning Findings Section */}
        <div>
          <h1 className="text-4xl font-bold uppercase text-indigo-600 mb-6 mt-3">Machine Learning Findings</h1>
          <div className="w-full h-[2px] bg-slate-800 mt-2"></div>
        </div>

        {/* Modal Action Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={props.handleCloseModal}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            disabled={postDisabled}
            className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ${postDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};


const FromDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      showIcon
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      className="p-2 border rounded"
    />
  );
};

const ToDate = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      showIcon
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      className="p-2 border rounded"
    />
  );
};

const ProjectReport = () => {
  const { data, error, isLoading } = useGetWtcsDataQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedRowData, setClickedRowData] = useState<ClickedRowDataInterface | null>(null);
  const [level0Scrutiny, setLevel0Scrutiny] = useState<'Accept' | 'Reject' | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Global search query

  const handleRowClick = (event: any) => {
    const rowData = event.data;
    setClickedRowData(rowData);
    setLevel0Scrutiny(rowData.lo_sc || ''); // Set default value
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setClickedRowData(null);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel0Scrutiny(e.target.value as 'Accept' | 'Reject');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

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
      cellRendererFramework: (params: any) => {
        return (
          <button
            className="text-blue-500 underline"
            onClick={() => handleRowClick(params)}
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
  ], []);

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
    <div className="flex flex-col bg-[#24303F] p-4">
      <div className='flex flex-wrap justify-between gap-4'>
        <div className="flex items-center gap-4">
          <FromDate />
          <ToDate />
        </div>

        {/* Global Search Input */}
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search by mobile, subject, or email"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-grow mt-6">
        <main className="w-full">
          <div className="ag-theme-alpine-dark" style={{ height: '400px', width: '100%' }}>
            <AgGridReact
              columnDefs={columnDefs}
              rowData={data as any[]}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
              quickFilterText={searchQuery} // Applying global search
              onRowClicked={handleRowClick}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectReport;