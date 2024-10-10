import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Table = ({ data, searchTerm }) => {
  const [filter, setFilter] = useState('Last 30 days');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Filter the requests based on the search term
  const filteredData = data.filter(request =>
    Object.values(request).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get the current items for the page
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Latest Requests</h2>
        <div className="table-controls">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              
            />
          </div>
          <div className="filter-dropdown">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last 90 days">Last 90 days</option>
              <option value="Last year">Last year</option>
            </select>
          </div>
        </div>
      </div>
      <table className="requests-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Req. ID</th>
            <th>Status</th>
            <th>Type</th>
            <th>Req. Time</th>
            <th>Content Type</th>
            <th>IP Address</th>
            <th>OS</th>
            <th>User Agent</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map(request => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.request_id}</td>
                <td>{request.status}</td>
                <td>{request.request_type}</td>
                <td>{request.request_time}</td>
                <td>{request.content_type}</td>
                <td>{request.ip_address}</td>
                <td>{request.os}</td>
                <td>{request.user_agent}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center' }}>
                No matching records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
