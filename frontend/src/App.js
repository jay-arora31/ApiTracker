import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import BarChartComponent from './components/BarChartComponent';
import PieChartComponent from './components/PieChartComponent';
import Table from './components/Table';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [requestTypeData, setRequestTypeData] = useState([]);
  const [browserData, setBrowserData] = useState([]);
  const [requestsData, setRequestsData] = useState([]);
  const [avgResponseTime, setAvgResponseTime] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [failedRequests, setFailedRequests] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/api_data/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRequestTypeData(data.requestTypeData);
        setBrowserData(data.browserData);
        setRequestsData(data.requestsData);
        setAvgResponseTime(data.avgResponseTime || 0);
        setTotalRequests(data.totalRequests);
        setFailedRequests(data.requestsData.filter(request => request.status === 400).length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <header>
          <h1>Hello Evano 👋</h1>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-info">
              <p>Total Requests</p>
              <h3>{totalRequests}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-info">
              <p>Avg. Response Time</p>
              <h3>{avgResponseTime}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛒</div>
            <div className="stat-info">
              <p>Failed Requests</p>
              <h3>{failedRequests}</h3>
            </div>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart-card">
            <h3>Request Type</h3>
            <BarChartComponent data={requestTypeData} />
          </div>
          <div className="chart-card">
            <h3>Browsers</h3>
            <PieChartComponent data={browserData} />
          </div>
        </div>

        <section className="requests-table">
          <Table data={requestsData} searchTerm={searchTerm} />
        </section>
      </main>
    </div>
  );
};

export default App;