import React, { useState } from 'react';
import Stock from '../components/Stock';
import styles from '../styles/Home.module.css'
import { Button } from 'antd';


const stockData = [
    {name: 'Company 1', ticker: 'C1', sector: 'Technology', open: 150, close: 152, high: 155, low: 148, outstandingShares: 2000000},
    {name: 'Company 2', ticker: 'C2', sector: 'Healthcare', open: 120, close: 125, high: 130, low: 118, outstandingShares: 1500000},
    {name: 'Company 3', ticker: 'C3', sector: 'Finance', open: 50, close: 52, high: 55, low: 48, outstandingShares: 3000000},
    {name: 'Company 4', ticker: 'C4', sector: 'Technology', open: 180, close: 175, high: 185, low: 172, outstandingShares: 1200000},
    {name: 'Company 5', ticker: 'C5', sector: 'Consumer Discretionary', open: 75, close: 77, high: 80, low: 72, outstandingShares: 2500000},
    {name: 'Company 6', ticker: 'C6', sector: 'Healthcare', open: 90, close: 95, high: 100, low: 85, outstandingShares: 1700000},
    {name: 'Company 7', ticker: 'C7', sector: 'Finance', open: 200, close: 205, high: 210, low: 195, outstandingShares: 1800000},
    {name: 'Company 8', ticker: 'C8', sector: 'Technology', open: 140, close: 145, high: 150, low: 135, outstandingShares: 2200000},
    {name: 'Company 9', ticker: 'C9', sector: 'Consumer Discretionary', open: 160, close: 165, high: 170, low: 155, outstandingShares: 2400000},
    {name: 'Company 10', ticker: 'C10', sector: 'Healthcare', open: 170, close: 175, high: 180, low: 165, outstandingShares: 2100000},
    {name: 'Company 11', ticker: 'C11', sector: 'Finance', open: 80, close: 85, high: 90, low: 75, outstandingShares: 2300000},
    {name: 'Company 12', ticker: 'C12', sector: 'Technology', open: 190, close: 195, high: 200, low: 185, outstandingShares: 1600000},
    {name: 'Company 13', ticker: 'C13', sector: 'Consumer Discretionary', open: 60, close: 65, high: 70, low: 55, outstandingShares: 2600000},
    {name: 'Company 14', ticker: 'C14', sector: 'Healthcare', open: 220, close: 225, high: 230, low: 215, outstandingShares: 1400000},
    {name: 'Company 15', ticker: 'C15', sector: 'Finance', open: 230, close: 235, high: 240, low: 225, outstandingShares: 1900000},
    {name: 'Company 16', ticker: 'C16', sector: 'Technology', open: 240, close: 245, high: 250, low: 235, outstandingShares: 1500000},
    {name: 'Company 17', ticker: 'C17', sector: 'Consumer Discretionary', open: 250, close: 255, high: 260, low: 245, outstandingShares: 1300000},
    {name: 'Company 18', ticker: 'C18', sector: 'Healthcare', open: 260, close: 265, high: 270, low: 255, outstandingShares: 1100000},
    {name: 'Company 19', ticker: 'C19', sector: 'Finance', open: 270, close: 275, high: 280, low: 265, outstandingShares: 1000000},
    {name: 'Company 20', ticker: 'C20', sector: 'Technology', open: 280, close: 285, high: 290, low: 275, outstandingShares: 900000},
];

const calculateCurrentValue = (stock) => {
  return stock.close * stock.outstandingShares;
};

const HomePage = () => {
  const [sortedStocks, setSortedStocks] = useState(stockData);
  const [sortOrder, setSortOrder] = useState({ property: 'open', order: 'asc' });

  const sortByProperty = (property) => {
    setSortOrder((prevSortOrder) => {
      if (prevSortOrder.property === property) {
        return { ...prevSortOrder, order: prevSortOrder.order === 'asc' ? 'desc' : 'asc' };
      }
      return { property, order: 'asc' };
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
    setSortOrder({ property: 'currentValue', order: sortOrder.order === 'asc' ? 'desc' : 'asc' });
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
 const filteredStocks = showTechnologyOnly
   ? stockData.filter((stock) => stock.sector === 'Technology')
   : sortedStocks;

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
