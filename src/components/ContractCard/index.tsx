import React from 'react';
import { toDecimalOdds, toBackStack } from '@/utils';

import styles from './index.module.scss';

interface IContractCardProps {
  market: Market;
}

const ContractCard: React.FunctionComponent<IContractCardProps> = (props) => {
  return (
    <div className={styles.contractGroup}>
      <div className={styles.header}>
        <div className={styles.contractGroupHeader}>
          <div className={styles.contractGroupName}>
            <span className={styles.formattedContent}>{props.market.name}</span>
          </div>
          {/* <div className={styles.contractGroupStats}>
            <span className={styles.volumeBadge}>
              Traded: <span className={styles.volumeValue}>£57,298</span>
            </span>
          </div> */}
        </div>
      </div>
      <div className={styles.contractWrapper}>
        <div className={styles.overroundInfo}>
          <span className={styles.overroundInfoNameColumn}>Contract</span>
          <span className={styles.lastPriceArea}></span>
          <span className={styles.priceSeries}></span>
          <span className={styles.priceSeries}></span>
        </div>
        <ul className={styles.contracts}>
          {props.market.contracts &&
            props.market.contracts.map((contract) => (
              <li className={styles.contractWrapper} key={contract.id}>
                <div className={styles.contact}>
                  <div className={styles.contractNameColumn}>
                    <div className={styles.contractInfo}>
                      <span className={styles.name}>
                        <span className={styles.formattedContent}>
                          {contract.name}
                        </span>
                      </span>
                    </div>
                  </div>
                  <span className={styles.lastPriceArea}>
                    <span className={styles.formattedPrice}></span>
                  </span>
                  <span className={`${styles.priceSeries} ${styles.buy}`}>
                    {contract.quote &&
                      contract.quote.offers.map((q, idx) => (
                        <span
                          className={`${styles.priceItem}`}
                          key={`offer_${idx}`}
                        >
                          <span
                            className={`${styles.price} ${
                              idx > 0 ? styles.normal : ''
                            }`}
                          >
                            {' '}
                            {toDecimalOdds(q.price)}
                          </span>
                          <span className={`${styles.stake} ${styles.tick}`}>
                            £{toBackStack(q.quantity, q.price)}
                          </span>
                        </span>
                      ))}

                    {!contract.quote ||
                      (contract.quote.offers.length < 3 &&
                        Array.apply(
                          null,
                          Array(3 - contract.quote.offers.length),
                        ).map((q, idx) => (
                          <span
                            className={`${styles.priceItem}`}
                            key={`offer_${idx}`}
                          >
                            <span
                              className={`${styles.price} ${
                                idx > 0 ||
                                (contract.quote &&
                                  contract.quote.offers.length !== 0)
                                  ? styles.normal
                                  : ''
                              }`}
                            >
                              {idx === 0 &&
                              contract.quote &&
                              contract.quote.offers.length === 0
                                ? 'BID'
                                : ''}
                            </span>
                          </span>
                        )))}
                  </span>
                  <span className={`${styles.priceSeries} ${styles.sell}`}>
                    {contract.quote &&
                      contract.quote.bids.map((q, idx) => (
                        <span
                          className={`${styles.priceItem} `}
                          key={`bids_${idx}`}
                        >
                          <span
                            className={`${styles.price} ${
                              idx > 0 ? styles.normal : ''
                            }`}
                          >
                            {toDecimalOdds(q.price)}
                          </span>
                          <span className={`${styles.stake} ${styles.tick}`}>
                            £{toBackStack(q.quantity, q.price)}
                          </span>
                        </span>
                      ))}

                    {!contract.quote ||
                      (contract.quote.bids.length < 3 &&
                        Array.apply(
                          null,
                          Array(3 - contract.quote.bids.length),
                        ).map((q, idx) => (
                          <span
                            className={`${styles.priceItem}`}
                            key={`offer_${idx}`}
                          >
                            <span
                              className={`${styles.price} ${
                                idx > 0 ||
                                (contract.quote &&
                                  contract.quote.bids.length !== 0)
                                  ? styles.normal
                                  : ''
                              }`}
                            >
                              {idx === 0 &&
                              contract.quote &&
                              contract.quote.bids.length === 0
                                ? 'ASK'
                                : ''}
                            </span>
                          </span>
                        )))}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ContractCard;
