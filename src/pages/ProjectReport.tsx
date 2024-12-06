import React, { useMemo, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
// import { useGetWtcsDataQuery } from '../features/wtcfetchApi';
import { useGetWtcReportApiQuery } from '../features/wtcreportApi'
import Loader from '../common/Loader';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Date Picker Component for "From Date"
const FromDate = ({ selectedDate, setSelectedDate }) => {
  return (
    <DatePicker
      showIcon
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      className="p-2 border rounded"
    />
  );
};

// Date Picker Component for "To Date"
const ToDate = ({ selectedDate, setSelectedDate }) => {
  return (
    <DatePicker
      showIcon
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      className="p-2 border rounded"
    />
  );
};

const ProjectReport = () => {
  const { data, error, isLoading } = useGetWtcReportApiQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedRowData, setClickedRowData] = useState(null);
  const [level0Scrutiny, setLevel0Scrutiny] = useState<'Accept' | 'Reject' | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Global search query

  // Date Filters
  const [fromDate, setFromDate] = useState<Date | null>(null); // From Date
  const [toDate, setToDate] = useState<Date | null>(null); // To Date

  // Filter data based on the date range
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((row) => {
      const createdAt = new Date(row.created_at);
      const isAfterFromDate = fromDate ? createdAt >= fromDate : true;
      const isBeforeToDate = toDate ? createdAt <= toDate : true;
      return isAfterFromDate && isBeforeToDate;
    });
  }, [data, fromDate, toDate]);

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
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Report
        </h2>
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <a className="font-medium" href="/">
                Dashboard /
              </a>
            </li>
            <li className="font-medium text-primary">Report</li>
          </ol>
        </nav>
      </div>
      <div className="flex flex-col p-4">
        <div className='flex flex-wrap justify-between gap-4'>
          <div className="flex items-center gap-4">
            <FromDate selectedDate={fromDate} setSelectedDate={setFromDate} />
            <ToDate selectedDate={toDate} setSelectedDate={setToDate} />
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
                rowData={filteredData as any[]}
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
    </>
  );
};

export default ProjectReport;