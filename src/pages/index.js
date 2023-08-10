import React, {useState} from 'react';
import Stock from '../components/Stock';
import styles from '../styles/Home.module.css';
import {Button} from 'antd';


const calculateCurrentValue = (stock) => {
  return stock.close * stock.outstandingShares;
};

const HomePage = () => {
  const [sortedStocks, setSortedStocks] = useState(stockData);
  const [sortOrder, setSortOrder] = useState({property: 'open', order: 'asc'});

  const sortByProperty = (property) => {
    setSortOrder((prevSortOrder) => {
      if (prevSortOrder.property === property) {
        return {...prevSortOrder, order: prevSortOrder.order === 'asc' ? 'desc' : 'asc'};
      }
      return {property, order: 'asc'};
    });


    setSortedStocks((prevStocks) => {
      const sortedStocks = [...prevStocks].sort((a, b) => {
        return (
          sortOrder.order === 'asc' ? a[property] - b[property] : b[property] - a[property]
        );
      });
      return sortedStocks;
    });
  };
    // Function to sort by value
  const sortByCurrentValue = () => {
    setSortOrder({property: 'currentValue', order: sortOrder.order === 'asc' ? 'desc' : 'asc'});
    setSortedStocks((prevStocks) => {
      const sortedStocks = [...prevStocks].sort((a, b) => {
        const aValue = calculateCurrentValue(a);
        const bValue = calculateCurrentValue(b);
        return sortOrder.order === 'asc' ? aValue - bValue : bValue - aValue;
      });
      return sortedStocks;
    });
  };

  // Function to calculate the total outstanding shares
  const calculateTotalOutstandingShares = () => {
    return stockData.reduce((totalShares, stock) => {
      return totalShares + stock.outstandingShares;
    }, 0);
  };

  // Calculate the total outstanding shares
  const totalOutstandingShares = calculateTotalOutstandingShares();

  // If filter is active
  const [showTechnologyOnly, setShowTechnologyOnly] = useState(false);

  // Function to toggle the technology filter
  const toggleTechnologyFilter = () => {
    setShowTechnologyOnly(!showTechnologyOnly);
  };

  // Filter the stock data based on the technology filter
  const filteredStocks = showTechnologyOnly ?
   stockData.filter((stock) => stock.sector === 'Technology') :
   sortedStocks;

  return (
    <div className={styles.main}>
      <h1 className={styles.pageTitle}>Stock Market Data</h1>
      <div className={styles.buttonContainer}>
        <div className={styles.sortButtonContainer}>
          <Button onClick={() => sortByProperty('open')}>Sort by Open Price</Button>
          <Button onClick={() => sortByProperty('close')}>Sort by Close Price</Button>
          <Button onClick={() => sortByProperty('high')}>Sort by High Price</Button>
          <Button onClick={() => sortByProperty('low')}>Sort by Low Price</Button>
          <Button onClick={sortByCurrentValue}>Sort by Current Value</Button>
        </div>
        <Button onClick={toggleTechnologyFilter}>
          {showTechnologyOnly ? 'Show All Sectors' : 'Show Technology Sector Only'}
        </Button>
      </div>
      <p>Total Outstanding Shares: {totalOutstandingShares}</p>
      <ul className={styles.stockList}>
        {filteredStocks.map((stock, index) => (
          <li key={index}>
            <Stock stock={stock} />
            <p>Current Value: {calculateCurrentValue(stock)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

// Pros
// Map, filter, reduce and sort being used
// useState being used

// Cons
// Nothing works when using filtered array
// ESlint perhaps - fixed
// No UI design, windows issues solved by not using windows - fixed

// Upgrades
// Rework list to cards/grid
// Use json or real API
