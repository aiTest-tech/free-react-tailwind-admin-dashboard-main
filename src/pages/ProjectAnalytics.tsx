import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { useGetWtcsDataQuery } from '../features/wtcfetchApi';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Loader from '../common/Loader';

const ProjectAnalytics = () => {
  const params = useParams();

  // Fetch data using RTK Query
  const { data, error, isLoading } = useGetWtcsDataQuery();
  console.log(data);

  // State for managing the modal visibility and selected message
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');

  // Function to handle opening the modal
  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true); // Open the modal with the full message
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(''); // Clear the message content
  };

  // Column definitions for ag-Grid
  const columnDefs = useMemo(() => [
    {
      headerName: '',
      checkboxSelection: true,
      width: 50
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
      // Add a "View Message" button to open the modal
      cellRendererFramework: (params) => (
        <button
          className="text-blue-500 underline"
          onClick={() => handleMessageClick(params.value)} // Open the modal with full message
        >
          View Message
        </button>
      ),
    },
    {
      headerName: 'Sentiment Gravity',
      field: 'sentiment_cal_gra',
      sortable: true,
      filter: true,
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
      headerName: 'Department Routing',
      field: 'depr_rout',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Created At',
      field: 'created_at',
      sortable: true,
      filter: true,
    },
  ], []);

  // Grid options for pagination, sorting, etc.
  const gridOptions = {
    paginationPageSize: 10,
    domLayout: 'autoHeight',
  };

  if (isLoading) return <div><Loader /></div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <>
      <div className="flex justify-between items-center gap-2 mb-5 ml-3">
        <div className="flex justify-between gap-3">
          <input className="py-2 rounded-lg px-2 bg-gray-700" type="date" />
          <input className="py-2 rounded-lg px-2 bg-gray-700" type="date" />
        </div>
      </div>

      <div className="bg-[#24303F] text-white min-h-screen">
        {/* ag-Grid table */}
        <div className="ag-theme-alpine-dark" style={{ height: '500px', width: '100%' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={data}  // Provide row data from RTK Query
            gridOptions={gridOptions}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
          />
        </div>

        {/* Modal for showing full message */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white text-black p-6 rounded-lg w-2/3 max-w-3xl">
              <h2 className="text-xl font-semibold mb-4">Full Message</h2>
              <div className="max-h-96 overflow-auto">
                <p>{selectedMessage}</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectAnalytics;
