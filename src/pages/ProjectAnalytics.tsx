// import React, { useMemo, useState } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import { useGetWtcsDataQuery } from '../features/wtcfetchApi';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import Loader from '../common/Loader';

// interface RowData {
//   sentiment_cal_pol: string;
//   subject: string;
//   message: string;
//   sentiment_cal_gra: string;
//   lo_sc: string;
//   depr_rout: string;
//   created_at: string;
// }

// const ProjectAnalytics = () => {
//   // Fetch data using RTK Query
//   const { data, error, isLoading } = useGetWtcsDataQuery();

//   // State for managing the modal visibility and selected message
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<string>('');

//   // Function to handle opening the modal
//   const handleMessageClick = (message: string) => {
//     setSelectedMessage(message);
//     setIsModalOpen(true); // Open the modal with the full message
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedMessage(''); // Clear the message content
//   };

//   // Column definitions for ag-Grid
//   const columnDefs = useMemo(() => [
//     {
//       headerName: '',
//       checkboxSelection: true,
//       width: 50
//     },
//     {
//       headerName: 'Sentiment Polarity',
//       field: 'sentiment_cal_pol',
//       sortable: true,
//       filter: true,
//       width: 160,
//       cellClassRules: {
//         'text-green-500': (params) => params.value && params.value.toLowerCase().trim() === 'positive',
//         'text-red-500': (params) => params.value && params.value.toLowerCase().trim() === 'negative',
//         'text-gray-500': (params) => params.value && params.value.toLowerCase().trim() === 'neutral',
//       },
//     },
//     {
//       headerName: 'Subject',
//       field: 'subject',
//       sortable: true,
//       filter: true,
//       width: 200,
//     },
//     {
//       headerName: 'Message',
//       field: 'message',
//       sortable: true,
//       filter: true,
//       width: 500,
//       // Rendering the button in the Message column
//       cellRendererFramework: (params: any) => (
//         <button
//           className="text-blue-500 underline"
//           onClick={() => handleMessageClick(params.value)} // Open the modal with full message
//         >
//           View Message
//         </button>
//       ),
//     },
//     {
//       headerName: 'Sentiment Gravity',
//       field: 'sentiment_cal_gra',
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: 'Level 0 Scrutiny',
//       field: 'lo_sc',
//       sortable: true,
//       filter: true,
//       cellClassRules: {
//         'text-green-500': (params) => params.value && params.value.toLowerCase().trim() === 'accept',
//         'text-red-500': (params) => params.value && params.value.toLowerCase().trim() === 'reject',
//       },
//     },
//     {
//       headerName: 'Department Routing',
//       field: 'depr_rout',
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: 'Created At',
//       field: 'created_at',
//       sortable: true,
//       filter: true,
//     },
//   ], []);

//   // Grid options for pagination, sorting, etc.
//   const gridOptions = {
//     paginationPageSize: 10,
//     domLayout: 'autoHeight',
//   };

//   // Handle loading, error, and empty data states
//   if (isLoading) return <div><Loader /></div>;
//   if (error) return <div>Error fetching data</div>;

//   // Check if data is empty or undefined
//   if (!data || data.length === 0) {
//     return <div>No data available</div>;
//   }

//   return (
//     <>
//       <div className="flex justify-between items-center gap-2 mb-5 ml-3 w-full">
//         <div className="flex justify-between items-center gap-3">
//           <div className="flex flex-col">
//             <label htmlFor="fromDate" className="text-white">From Date</label>
//             <input
//               id="fromDate"
//               className="py-2 rounded-lg px-2 bg-gray-700"
//               type="date"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="toDate" className="text-white">To Date</label>
//             <input
//               id="toDate"
//               className="py-2 rounded-lg px-2 bg-gray-700"
//               type="date"
//             />
//           </div>
//         </div>
//         <div>
//           <button className='px-10 py-2 mt-3 text-white bg-green-900 mr-3 rounded-lg '>Post</button>
//         </div>
//       </div>

//       <div className="bg-[#24303F] text-white min-h-screen">
//         {/* ag-Grid table */}
//         <div className="ag-theme-alpine-dark" style={{ height: '300px', width: '100%' }}>
//           <AgGridReact
//             columnDefs={columnDefs}
//             rowData={data as RowData[]} 
//             gridOptions={gridOptions}
//             pagination={true}
//             paginationPageSize={10}
//             domLayout="autoHeight"
//           />
//         </div>

//         {/* Modal for showing full message */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
//             <div className="bg-white text-black p-6 rounded-lg w-2/3 max-w-3xl">
//               <h2 className="text-xl font-semibold mb-4">Full Message</h2>
//               <div className="max-h-96 overflow-auto">
//                 <p>{selectedMessage}</p>
//               </div>
//               <button
//                 onClick={handleCloseModal}
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ProjectAnalytics;

// import React from 'react';
// import DataTable from 'react-data-table-component';

// const DataTableComponent = () => {
//   const columns = [
//     { name: 'Sentiment Polarity', selector: row => row.sentiment_cal_pol },
//     { name: 'Subject', selector: row => row.subject },
//     { name: 'Message', selector: row => row.message },
//     { name: 'Sentiment Gravity', selector: row => row.sentiment_cal_gra },
//     { name: 'Level 0 Scrutiny', selector: row => row.lo_sc },
//     { name: 'Department Routing', selector: row => row.depr_rout },
//     { name: 'Created At', selector: row => row.created_at },
//   ];

//   const data = [
//     {
//       sentiment_cal_pol: 'positive',
//       subject: 'Subject 1',
//       message: 'This is a test message.',
//       sentiment_cal_gra: 'high',
//       lo_sc: 'accept',
//       depr_rout: 'IT',
//       created_at: '2024-11-29',
//     },
//     {
//       sentiment_cal_pol: 'negative',
//       subject: 'Subject 2',
//       message: 'This is another test message.',
//       sentiment_cal_gra: 'low',
//       lo_sc: 'reject',
//       depr_rout: 'HR',
//       created_at: '2024-11-28',
//     },
//   ];

//   return (
//     <div>
//       <h1>React Data Table Example</h1>
//       <DataTable
//         title="Sample Data"
//         columns={columns}
//         data={data}
//         pagination
//       />
//     </div>
//   );
// };

// export default DataTableComponent;


// import React, { useMemo, useState } from 'react';
// import { useGetWtcsDataQuery } from '../features/wtcfetchApi';
// import Loader from '../common/Loader';
// import DataTable from 'react-data-table-component';

// interface RowData {
//   sentiment_cal_pol: string;
//   subject: string;
//   message: string;
//   sentiment_cal_gra: string;
//   lo_sc: string;
//   depr_rout: string;
//   created_at: string;
// }

// const ProjectAnalytics = () => {
//   // Fetch data using RTK Query
//   const { data, error, isLoading } = useGetWtcsDataQuery();

//   // State for managing the modal visibility and selected message
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<string>('');

//   // Function to handle opening the modal
//   const handleMessageClick = (message: string) => {
//     setSelectedMessage(message);
//     setIsModalOpen(true); // Open the modal with full message
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedMessage(''); // Clear the message content
//   };

//   // Define columns for react-data-table-component
//   const columns = useMemo(() => [
//     {
//       name: '',
//       selector: (row: RowData) => row.sentiment_cal_pol, // Placeholder column for checkbox
//       sortable: true,
//       cell: (row: RowData) => (
//         <input type="checkbox" />
//       ),
//     },
//     {
//       name: 'Sentiment Polarity',
//       selector: (row: RowData) => row.sentiment_cal_pol,
//       sortable: true,
//       cell: (row: RowData) => (
//         <span
//           className={
//             row.sentiment_cal_pol.toLowerCase().trim() === 'positive'
//               ? 'text-green-500'
//               : row.sentiment_cal_pol.toLowerCase().trim() === 'negative'
//                 ? 'text-red-500'
//                 : 'text-gray-500'
//           }
//         >
//           {row.sentiment_cal_pol}
//         </span>
//       ),
//     },
//     {
//       name: 'Subject',
//       selector: (row: RowData) => row.subject,
//       sortable: true,
//     },
//     {
//       name: 'Message',
//       selector: (row: RowData) => row.message,
//       sortable: true,
//       cell: (row: RowData) => (
//         <button
//           className="text-blue-500 underline"
//           onClick={() => handleMessageClick(row.message)} // Open the modal with full message
//         >
//           View Message
//         </button>
//       ),
//     },
//     {
//       name: 'Sentiment Gravity',
//       selector: (row: RowData) => row.sentiment_cal_gra,
//       sortable: true,
//     },
//     {
//       name: 'Level 0 Scrutiny',
//       selector: (row: RowData) => row.lo_sc,
//       sortable: true,
//       cell: (row: RowData) => (
//         <span
//           className={
//             row.lo_sc.toLowerCase().trim() === 'accept'
//               ? 'text-green-500'
//               : row.lo_sc.toLowerCase().trim() === 'reject'
//                 ? 'text-red-500'
//                 : 'text-gray-500'
//           }
//         >
//           {row.lo_sc}
//         </span>
//       ),
//     },
//     {
//       name: 'Department Routing',
//       selector: (row: RowData) => row.depr_rout,
//       sortable: true,
//     },
//     {
//       name: 'Created At',
//       selector: (row: RowData) => row.created_at,
//       sortable: true,
//     },
//   ], []);

//   // Handle loading, error, and empty data states
//   if (isLoading) return <div><Loader /></div>;
//   if (error) return <div>Error fetching data</div>;

//   // Check if data is empty or undefined
//   if (!data || data.length === 0) {
//     return <div>No data available</div>;
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center gap-2 mb-5 ml-3 w-full">
//         <div className="flex justify-between items-center gap-3">
//           <div className="flex flex-col">
//             <label htmlFor="fromDate" className="text-white">From Date</label>
//             <input
//               id="fromDate"
//               className="py-2 rounded-lg px-2 bg-gray-700"
//               type="date"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="toDate" className="text-white">To Date</label>
//             <input
//               id="toDate"
//               className="py-2 rounded-lg px-2 bg-gray-700"
//               type="date"
//             />
//           </div>
//         </div>
//         <div>
//           <button className="px-10 py-2 mt-3 text-white bg-green-900 mr-3 rounded-lg">Post</button>
//         </div>
//       </div>

//       <div className="bg-[#24303F] text-white min-h-screen">
//         {/* DataTable component for rendering data */}
//         <DataTable
//           title="Project Analytics"
//           columns={columns}
//           data={data as RowData[]}
//           pagination
//           paginationPerPage={10}
//           highlightOnHover
//         />

//         {/* Modal for showing full message */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
//             <div className="bg-white text-black p-6 rounded-lg w-2/3 max-w-3xl">
//               <h2 className="text-xl font-semibold mb-4">Full Message</h2>
//               <div className="max-h-96 overflow-auto">
//                 <p>{selectedMessage}</p>
//               </div>
//               <button
//                 onClick={handleCloseModal}
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectAnalytics;





// import React, { useMemo, useState } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import { useGetWtcsDataQuery } from '../features/wtcfetchApi'; // Assuming this fetches data
// import Loader from '../common/Loader';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// interface RowData {
//   sentiment_cal_pol: string;
//   subject: string;
//   message: string;
//   sentiment_cal_gra: string;
//   lo_sc: string;
//   depr_rout: string;
//   created_at: string;
// }

// const ProjectAnalytics = () => {
//   // Fetch data using RTK Query
//   const { data, error, isLoading } = useGetWtcsDataQuery();

//   // State for managing the modal visibility and selected message
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<string>('');

//   // Function to handle opening the modal
//   const handleMessageClick = (message: string) => {
//     setSelectedMessage(message);
//     setIsModalOpen(true); // Open the modal with full message
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedMessage(''); // Clear the message content
//   };

//   // Column definitions for ag-Grid
//   const columnDefs = useMemo(() => [
//     {
//       headerName: '',
//       checkboxSelection: true,
//       width: 50
//     },
//     {
//       headerName: 'Sentiment Polarity',
//       field: 'sentiment_cal_pol',
//       sortable: true,
//       filter: true,
//       width: 160,
//       cellClassRules: {
//         'text-green-500': (params) => params.value && params.value.toLowerCase().trim() === 'positive',
//         'text-red-500': (params) => params.value && params.value.toLowerCase().trim() === 'negative',
//         'text-gray-500': (params) => params.value && params.value.toLowerCase().trim() === 'neutral',
//       },
//     },
//     {
//       headerName: 'Subject',
//       field: 'subject',
//       sortable: true,
//       filter: true,
//       width: 200,
//     },
//     {
//       headerName: 'Message',
//       field: 'message',
//       sortable: true,
//       filter: true,
//       width: 500,
//       // Rendering the button in the Message column
//       cellRendererFramework: (params: any) => {
//         // Logging the data to make sure we have the message content
//         console.log('Row Data:', params.data);
//         return (
//           <button
//             className="text-blue-500 underline"
//             onClick={() => handleMessageClick(params.value)} // Open the modal with full message
//           >
//             View Message
//           </button>
//         );
//       },
//     },
//     {
//       headerName: 'Sentiment Gravity',
//       field: 'sentiment_cal_gra',
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: 'Level 0 Scrutiny',
//       field: 'lo_sc',
//       sortable: true,
//       filter: true,
//       cellClassRules: {
//         'text-green-500': (params) => params.value && params.value.toLowerCase().trim() === 'accept',
//         'text-red-500': (params) => params.value && params.value.toLowerCase().trim() === 'reject',
//       },
//     },
//     {
//       headerName: 'Department Routing',
//       field: 'depr_rout',
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: 'Created At',
//       field: 'created_at',
//       sortable: true,
//       filter: true,
//     },
//   ], []);

//   // Handle loading, error, and empty data states
//   if (isLoading) return <div><Loader /></div>;
//   if (error) return <div>Error fetching data</div>;

//   // Check if data is empty or undefined
//   if (!data || data.length === 0) {
//     return <div>No data available</div>;
//   }

//   return (
//     <div>
//       {/* Your UI Layout for Date Picker, Post Button, etc. */}
//       <div className="flex justify-between items-center gap-2 mb-5 ml-3 w-full">
//         <div className="flex justify-between items-center gap-3">
//           <div className="flex flex-col">
//             <label htmlFor="fromDate" className="text-white">From Date</label>
//             <input
//               id="fromDate"
//               className="py-2 rounded-lg px-2 bg-gray-700"
//               type="date"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="toDate" className="text-white">To Date</label>
//             <input
//               id="toDate"
//               className="py-2 rounded-lg px-2 bg-gray-700"
//               type="date"
//             />
//           </div>
//         </div>
//         <div>
//           <button className="px-10 py-2 mt-3 text-white bg-green-900 mr-3 rounded-lg">Post</button>
//         </div>
//       </div>

//       {/* ag-Grid Table */}
//       <div className="bg-[#24303F] text-white min-h-screen">
//         <div className="ag-theme-alpine-dark" style={{ height: '300px', width: '100%' }}>
//           <AgGridReact
//             columnDefs={columnDefs}
//             rowData={data as RowData[]}
//             pagination={true}
//             paginationPageSize={10}
//             domLayout="autoHeight"
//           />
//         </div>

//         {/* Modal for showing full message */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
//             <div className="bg-white text-black p-6 rounded-lg w-2/3 max-w-3xl">
//               <h2 className="text-xl font-semibold mb-4">Full Message</h2>
//               <div className="max-h-96 overflow-auto">
//                 <p>{selectedMessage}</p>
//               </div>
//               <button
//                 onClick={handleCloseModal}
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectAnalytics;



// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { useGetWtcsDataQuery } from '../features/wtcfetchApi';  // Assuming this fetches data
// import Loader from '../common/Loader';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Choose the theme you like
// import 'primereact/resources/primereact.min.css';                   // Core CSS
// import 'primeicons/primeicons.css';                                // Prime Icons

// interface RowData {
//   sentiment_cal_pol: string;
//   subject: string;
//   message: string;
//   sentiment_cal_gra: string;
//   lo_sc: string;
//   depr_rout: string;
//   created_at: string;
// }

// const ProjectAnalytics = () => {
//   // Fetch data using RTK Query
//   const { data, error, isLoading } = useGetWtcsDataQuery();

//   // State for managing the modal visibility and selected message
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<string>('');

//   // Function to handle opening the modal
//   const handleMessageClick = (message: string) => {
//     setSelectedMessage(message);
//     setIsModalOpen(true); // Open the modal with full message
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedMessage(''); // Clear the message content
//   };

//   // Handle loading, error, and empty data states
//   if (isLoading) return <div><Loader /></div>;
//   if (error) return <div>Error fetching data</div>;

//   // Check if data is empty or undefined
//   if (!data || data.length === 0) {
//     return <div>No data available</div>;
//   }

//   return (
//     <div className="p-4">
//       {/* Table Layout */}
//       <div className="card">
//         <DataTable value={data} paginator rows={10} rowsPerPageOptions={[10, 20, 50]} className="p-datatable-customers">
//           <Column field="sentiment_cal_pol" header="Sentiment Polarity" sortable filter />
//           <Column field="subject" header="Subject" sortable filter />
//           <Column field="message" header="Message" sortable filter
//             body={(rowData: RowData) => (
//               <Button label="View Message" icon="pi pi-eye" className="p-button-text" onClick={() => handleMessageClick(rowData.message)} />
//             )}
//           />
//           <Column field="sentiment_cal_gra" header="Sentiment Gravity" sortable filter />
//           <Column field="lo_sc" header="Level 0 Scrutiny" sortable filter />
//           <Column field="depr_rout" header="Department Routing" sortable filter />
//           <Column field="created_at" header="Created At" sortable filter />
//         </DataTable>
//       </div>

//       {/* Modal for showing full message */}
//       <Dialog header="Full Message" visible={isModalOpen} style={{ width: '50vw' }} onHide={handleCloseModal}>
//         <p>{selectedMessage}</p>
//         <Button label="Close" icon="pi pi-times" onClick={handleCloseModal} />
//       </Dialog>
//     </div>
//   );
// };

// export default ProjectAnalytics;


// import React, { useMemo, useState } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import { useGetWtcsDataQuery } from '../features/wtcfetchApi'; // Assuming this fetches data
// import Loader from '../common/Loader';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// interface RowData {
//   sentiment_cal_pol: string;
//   subject: string;
//   message: string;
//   sentiment_cal_gra: string;
//   lo_sc: string;
//   depr_rout: string;
//   created_at: string;
// }

// const ProjectAnalytics = () => {
//   // Fetch data using RTK Query
//   const { data, error, isLoading } = useGetWtcsDataQuery();

//   // State for managing the modal visibility and selected message
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<string>('');
//   const [clickedRowData, setClickedRowData] = useState<RowData | null>(null); // State for clicked row data

//   // Function to handle opening the modal
//   const handleMessageClick = (message: string) => {
//     setSelectedMessage(message);
//     setIsModalOpen(true); // Open the modal with full message
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedMessage(''); // Clear the message content
//   };

//   // Column definitions for ag-Grid
//   const columnDefs = useMemo(() => [
//     {
//       headerName: '',
//       checkboxSelection: true,
//       width: 50
//     },
//     {
//       headerName: 'Sentiment Polarity',
//       field: 'sentiment_cal_pol',
//       sortable: true,
//       filter: true,
//       width: 160,
//       cellClassRules: {
//         'text-green-500': (params) => params.value && params.value.toLowerCase().trim() === 'positive',
//         'text-red-500': (params) => params.value && params.value.toLowerCase().trim() === 'negative',
//         'text-gray-500': (params) => params.value && params.value.toLowerCase().trim() === 'neutral',
//       },
//     },
//     {
//       headerName: 'Subject',
//       field: 'subject',
//       sortable: true,
//       filter: true,
//       width: 200,
//     },
//     {
//       headerName: 'Message',
//       field: 'message',
//       sortable: true,
//       filter: true,
//       width: 500,
//       // Rendering the button in the Message column
//       cellRendererFramework: (params: any) => {
//         // Logging the data to make sure we have the message content
//         console.log('Row Data:', params.data);
//         return (
//           <button
//             className="text-blue-500 underline"
//             onClick={() => handleMessageClick(params.value)} // Open the modal with full message
//           >
//             View Message
//           </button>
//         );
//       },
//     },
//     {
//       headerName: 'Sentiment Gravity',
//       field: 'sentiment_cal_gra',
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: 'Level 0 Scrutiny',
//       field: 'lo_sc',
//       sortable: true,
//       filter: true,
//       cellClassRules: {
//         'text-green-500': (params) => params.value && params.value.toLowerCase().trim() === 'accept',
//         'text-red-500': (params) => params.value && params.value.toLowerCase().trim() === 'reject',
//       },
//     },
//     {
//       headerName: 'Department Routing',
//       field: 'depr_rout',
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: 'Created At',
//       field: 'created_at',
//       sortable: true,
//       filter: true,
//     },
//   ], []);

//   // Handle row click event
//   const handleRowClick = (event: any) => {
//     const rowData = event.data; // Get the data of the clicked row
//     setClickedRowData(rowData); // Set the clicked row data to state
//     console.log('Clicked Row Data:', rowData); // Log or process the row data as needed
//   };

//   // Handle loading, error, and empty data states
//   if (isLoading) return <div><Loader /></div>;
//   if (error) return <div>Error fetching data</div>;

//   // Check if data is empty or undefined
//   if (!data || data.length === 0) {
//     return <div>No data available</div>;
//   }

//   return (
//     <div>
//       {/* Your UI Layout for Date Picker, Post Button, etc. */}
//       <div className="flex justify-between items-center gap-2 mb-5 ml-3 w-full">
//         <div className="flex justify-between items-center gap-3">
//           <div className="flex flex-col">
//             <label htmlFor="fromDate" className="text-white">From Date</label>
//             <input
//               id="fromDate"
//               className="py-2 rounded-lg px-2 bg-gray-700"
//               type="date"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="toDate" className="text-white">To Date</label>
//             <input
//               id="toDate"
//               className="py-2 rounded-lg px-2 bg-gray-700"
//               type="date"
//             />
//           </div>
//         </div>
//         <div>
//           <button className="px-10 py-2 mt-3 text-white bg-green-900 mr-3 rounded-lg">Post</button>
//         </div>
//       </div>

//       {/* ag-Grid Table */}
//       <div className="bg-[#24303F] text-white min-h-screen">
//         <div className="ag-theme-alpine-dark" style={{ height: '300px', width: '100%' }}>
//           <AgGridReact
//             columnDefs={columnDefs}
//             rowData={data as RowData[]}
//             pagination={true}
//             paginationPageSize={10}
//             domLayout="autoHeight"
//             onRowClicked={handleRowClick} // Register row click handler
//           />
//         </div>

//         {/* Modal for showing full message */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
//             <div className="bg-white text-black p-6 rounded-lg w-2/3 max-w-3xl">
//               <h2 className="text-xl font-semibold mb-4">Full Message</h2>
//               <div className="max-h-96 overflow-auto">
//                 <p>{selectedMessage}</p>
//               </div>
//               <button
//                 onClick={handleCloseModal}
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Displaying the clicked row data if needed */}
//         {clickedRowData && (
//           <div className="p-4 mt-[200px] bg-white text-black">
//             <h2 className="font-semibold">Clicked Row Data:</h2>
//             <pre>{JSON.stringify(clickedRowData, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectAnalytics;

// import React, { useMemo, useState } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import { useGetWtcsDataQuery } from '../features/wtcfetchApi'; // Assuming this fetches data
// import Loader from '../common/Loader';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// interface RowData {
//   id: number;
//   type: string;
//   lang: string;
//   phone: string;
//   sentiment_cal_pol: string;
//   subject: string;
//   message: string;
//   sentiment_cal_gra: string;
//   lo_sc: string;
//   depr_rout: string;
//   created_at: string;
//   email: string
// }

// const ProjectAnalytics = () => {
//   // Fetch data using RTK Query
//   const { data, error, isLoading } = useGetWtcsDataQuery();

//   // State for managing the modal visibility and selected row data
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [clickedRowData, setClickedRowData] = useState<RowData | null>(null);

//   // Function to handle opening the modal with row data
//   const handleRowClick = (event: any) => {
//     const rowData = event.data; // Get the data of the clicked row
//     setClickedRowData(rowData); // Set the clicked row data to state
//     setIsModalOpen(true); // Open the modal
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setClickedRowData(null); // Clear the row data
//   };

//   // Column definitions for ag-Grid
// const columnDefs = useMemo(() => [
//   {
//     headerName: '',
//     checkboxSelection: true,
//     width: 50
//   },
//   {
//     headerName: "id",
//     width: 80,
//     field: 'id',
//     sortable: true,
//   },
//   {
//     headerName: 'Level 0 Scrutiny',
//     field: 'lo_sc',
//     sortable: true,
//     filter: true,
//     cellClassRules: {
//       'text-green-500': (params) => params.value && params.value.toLowerCase().trim() === 'accept',
//       'text-red-500': (params) => params.value && params.value.toLowerCase().trim() === 'reject',
//     },
//   },
//   {
//     headerName: 'Sentiment Polarity',
//     field: 'sentiment_cal_pol',
//     sortable: true,
//     filter: true,
//     width: 160,
//     cellClassRules: {
//       'text-green-500': (params) => params.value && params.value.toLowerCase().trim() === 'positive',
//       'text-red-500': (params) => params.value && params.value.toLowerCase().trim() === 'negative',
//       'text-gray-500': (params) => params.value && params.value.toLowerCase().trim() === 'neutral',
//     },
//   },
//   {
//     headerName: 'Subject',
//     field: 'subject',
//     sortable: true,
//     filter: true,
//     width: 200,
//   },
//   {
//     headerName: 'Message',
//     field: 'message',
//     sortable: true,
//     filter: true,
//     width: 500,
//     // Rendering the button in the Message column
//     cellRendererFramework: (params: any) => {
//       return (
//         <button
//           className="text-blue-500 underline"
//           onClick={() => handleRowClick(params)} // Open the modal with full row data
//         >
//           View Details
//         </button>
//       );
//     },
//   },
//   {
//     headerName: 'Sentiment Gravity',
//     field: 'sentiment_cal_gra',
//     sortable: true,
//     filter: true,
//   },
//   {
//     headerName: 'Department Routing',
//     field: 'depr_rout',
//     sortable: true,
//     filter: true,
//   },
//   {
//     headerName: "phone",
//     field: 'phone',
//     sortable: true,
//     width: 200
//   },
//   {
//     headerName: "email",
//     field: 'email',
//     sortable: true,
//     width: 200
//   },
//   {
//     headerName: 'Created At',
//     field: 'created_at',
//     sortable: true,
//     filter: true,
//   },
// ], []);

//   // Handle loading, error, and empty data states
//   if (isLoading) return <div><Loader /></div>;
//   if (error) return <div>Error fetching data</div>;

//   // Check if data is empty or undefined
//   if (!data || data.length === 0) {
//     return <div>No data available</div>;
//   }

//   return (
//     <div>
//       {/* Your UI Layout for Date Picker, Post Button, etc. */}
//       <div className="flex justify-between items-center gap-2 mb-5 ml-3 w-full">
//         <div className="flex justify-between items-center gap-3">
//           <div className="flex flex-col">
//             <label htmlFor="fromDate" className="text-white">From Date</label>
//             <input
//               id="fromDate"
//               className="py-2 rounded-lg px-2 bg-gray-700"
//               type="date"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label htmlFor="toDate" className="text-white">To Date</label>
//             <input
//               id="toDate"
//               className="py-2 rounded-lg px-2 bg-gray-700"
//               type="date"
//             />
//           </div>
//         </div>
//         <div>
//           <button className="px-10 py-2 mt-3 text-white bg-green-900 mr-3 rounded-lg">Post</button>
//         </div>
//       </div>

//       {/* ag-Grid Table */}
//       <div className="bg-[#24303F] text-white min-h-screen">
//         <div className="ag-theme-alpine-dark" style={{ height: '300px', width: '100%' }}>
//           <AgGridReact
//             columnDefs={columnDefs}
//             rowData={data as RowData[]}
//             pagination={true}
//             paginationPageSize={10}
//             domLayout="autoHeight"
//             onRowClicked={handleRowClick} // Register row click handler
//           />
//         </div>

//         {/* Modal for displaying specific row data */}
//         {isModalOpen && clickedRowData && (
//           <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
//             <div className="bg-white text-black p-6 rounded-lg w-2/3 max-w-3xl">
//               <h2 className="text-xl font-semibold mb-4">Details</h2>
//               <div className="space-y-2">
//                 <div><strong className='text-xl font-extrabold'>Id:</strong><span className='text-xl  ml-3'>{clickedRowData.id}</span></div>
//                 {/* <div><strong className='text-xl font-extrabold'>Email:</strong><span className='text-xl  ml-3'>{clickedRowData.email}</span></div> */}
//                 <div>
//                   <strong className="text-xl font-extrabold">Email:</strong>
//                   <span className="text-xl ml-3">
//                     {clickedRowData.email ? clickedRowData.email : '-'}
//                   </span>
//                 </div>
//                 <div><strong className='text-xl font-extrabold'>Phone:</strong><span className='text-xl  ml-3'>{clickedRowData.phone}</span></div>
//                 <div><strong className='text-xl font-extrabold'>Sentiment Polarity:</strong><span className='text-xl  ml-3'>{clickedRowData.sentiment_cal_pol}</span></div>
//                 <div><strong className='text-xl font-extrabold'>Message:</strong> <span className='text-xl '>{clickedRowData.message}</span></div>
//                 <div><strong className='text-xl font-extrabold'>Department Routing:</strong>  <span className='text-xl '>{clickedRowData.depr_rout}</span></div>
//                 <div><strong className='text-xl font-extrabold'>Created At:</strong> <span className='text-xl '>{clickedRowData.created_at}</span></div>
//                 <div><strong className='text-xl font-extrabold'>Suggested Level 0 Scrutiny</strong><span className='text-xl ml-3'></span></div>
//               </div>
//               <button
//                 onClick={handleCloseModal}
//                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectAnalytics;






import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useGetWtcsDataQuery } from '../features/wtcfetchApi'; // Assuming this fetches data
import Loader from '../common/Loader';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface RowData {
  id: number;
  type: string;
  lang: string;
  phone: string;
  sentiment_cal_pol: string;
  subject: string;
  message: string;
  sentiment_cal_gra: string;
  lo_sc: string;
  depr_rout: string;
  created_at: string;
  email: string;
  name:string;
  occupation:string;
  address:string;
  district_corporation:string;
  taluka_zone:string;
  village_area:string;
}

const ProjectAnalytics = () => {
  // Fetch data using RTK Query
  const { data, error, isLoading } = useGetWtcsDataQuery();

  // State for managing the modal visibility, selected row data, and selected scrutiny
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedRowData, setClickedRowData] = useState<RowData | null>(null);
  const [level0Scrutiny, setLevel0Scrutiny] = useState<string>(''); // State for Level 0 Scrutiny

  // Function to handle opening the modal with row data
  const handleRowClick = (event: any) => {
    const rowData = event.data; // Get the data of the clicked row
    setClickedRowData(rowData); // Set the clicked row data to state
    setLevel0Scrutiny(rowData.lo_sc || ''); // Set the default value for Level 0 Scrutiny (Accept or Reject)
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setClickedRowData(null); // Clear the row data
  };

  // Function to handle radio button selection
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevel0Scrutiny(event.target.value); // Update the state with the selected value
  };

  // Column definitions for ag-Grid
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

  // Handle loading, error, and empty data states
  if (isLoading) return <div><Loader /></div>;
  if (error) return <div>Error fetching data</div>;

  // Check if data is empty or undefined
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {/* Your UI Layout for Date Picker, Post Button, etc. */}
      <div className="flex justify-between items-center gap-2 mb-5 ml-3 w-full">
        <div className="flex justify-between items-center gap-3">
          {/* Date picker and Post button */}
        </div>
      </div>

      {/* ag-Grid Table */}
      <div className="bg-[#24303F] text-white min-h-screen">
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

        {/* Modal for displaying specific row data */}
        {isModalOpen && clickedRowData && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 overflow-scroll h-[500px]">
            <div className="bg-white text-black p-6 rounded-lg w-2/3 max-w-3xl">
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              <div className="space-y-2">
                <div><strong className='text-xl font-extrabold'>Id:</strong><span className='text-xl ml-3'>{clickedRowData.id}</span></div>
                <div><strong className='text-xl font-extrabold'>Name:</strong><span className='text-xl ml-3'>{clickedRowData.name}</span></div>
                <div><strong className='text-xl font-extrabold'>Occupation:</strong><span className='text-xl ml-3'>{clickedRowData.occupation}</span></div>
                <div><strong className='text-xl font-extrabold'>Address:</strong><span className='text-xl ml-3'>{clickedRowData.address}</span></div>
                <div><strong className='text-xl font-extrabold'>Phone:</strong><span className='text-xl ml-3'>{clickedRowData.phone}</span></div>
                <div><strong className='text-xl font-extrabold'>District:</strong><span className='text-xl ml-3'>{clickedRowData.district_corporation}</span></div>
                <div><strong className='text-xl font-extrabold'>Taluka:</strong><span className='text-xl ml-3'>{clickedRowData.taluka_zone}</span></div>
                <div><strong className='text-xl font-extrabold'>Village:</strong><span className='text-xl ml-3'>{clickedRowData.village_area}</span></div>
                <div><strong className='text-xl font-extrabold'>Subject:</strong><span className='text-xl'>{clickedRowData.subject}</span></div>
                <div><strong className='text-xl font-extrabold'>Department Routing:</strong><span className='text-xl'>{clickedRowData.depr_rout}</span></div>
                <div><strong className='text-xl font-extrabold'>Message:</strong><span className='text-xl'>{clickedRowData.message}</span></div>
                {/* <div><strong className='text-xl font-extrabold'>Sentiment Polarity:</strong><span className='text-xl ml-3'>{clickedRowData.sentiment_cal_pol}</span></div> */}
                <div>
                  <strong className="text-xl font-extrabold">Email:</strong>
                  <span className="text-xl ml-3">
                    {clickedRowData.email ? clickedRowData.email : '-'}
                  </span>
                </div>
                {/* <div><strong className='text-xl font-extrabold'>Created At:</strong><span className='text-xl'>{clickedRowData.created_at}</span></div> */}

                {/* Level 0 Scrutiny Radio Buttons */}
                <div>
                  <strong className="text-xl font-extrabold">Suggested Level 0 Scrutiny:</strong>
                  <div className="flex items-center gap-5 mt-3">
                    <div>
                      <input
                        type="radio"
                        id="accept"
                        name="level0Scrutiny"
                        value="accept"
                        checked={level0Scrutiny === 'Accept'}
                        onChange={handleRadioChange}
                        className="mr-2"
                      />
                      <label htmlFor="accept" className="text-xl">Accept</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="reject"
                        name="level0Scrutiny"
                        value="reject"
                        checked={level0Scrutiny === 'Reject'}
                        onChange={handleRadioChange}
                        className="mr-2"
                      />
                      <label htmlFor="reject" className="text-xl">Reject</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectAnalytics;
