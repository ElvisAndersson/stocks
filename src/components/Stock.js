import React from 'react';
import styles from './Stock.module.css';

// component to destructure data 

const Stock = ({ stock }) => {
  const { name, ticker, sector, open, close, high, low, outstandingShares } = stock ?? {};

  return (
    <div className={styles.stockCard}>
      <h2 className={styles.stockName}>{name}</h2>
      <div className={styles.stockInfo}>
        <div className={styles.stockInfoItem}>
          <span className={styles.stockInfoLabel}>Ticker:</span>
          <span className={styles.stockInfoValue}>{ticker}</span>
        </div>
        <div className={styles.stockInfoItem}>
          <span className={styles.stockInfoLabel}>Sector:</span>
          <span className={styles.stockInfoValue}>{sector}</span>
        </div>
        <div className={styles.stockInfoItem}>
          <span className={styles.stockInfoLabel}>Open:</span>
          <span className={styles.stockInfoValue}>${open}</span>
        </div>
        <div className={styles.stockInfoItem}>
          <span className={styles.stockInfoLabel}>Close:</span>
          <span className={styles.stockInfoValue}>${close}</span>
        </div>
        <div className={styles.stockInfoItem}>
          <span className={styles.stockInfoLabel}>High:</span>
          <span className={styles.stockInfoValue}>${high}</span>
        </div>
        <div className={styles.stockInfoItem}>
          <span className={styles.stockInfoLabel}>Low:</span>
          <span className={styles.stockInfoValue}>${low}</span>
        </div>
        <div className={styles.stockInfoItem}>
          <span className={styles.stockInfoLabel}>Outstanding Shares:</span>
          <span className={styles.stockInfoValue}>{outstandingShares}</span>
        </div>
        </div>
        </div>
  );
};

export default Stock;
