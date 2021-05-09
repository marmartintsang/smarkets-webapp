import React from 'react';
import { Skeleton } from 'antd';
import moment, { min } from 'moment';

import styles from './index.module.scss';

interface IEventCardProps {
  event: EventDetail;
}

const EventCard: React.FunctionComponent<IEventCardProps> = ({ event }) => {
  const getRemainingTime = (
    startDt: string,
    format: 'hour' | 'min' = 'hour',
  ) => {
    const duration = moment.duration(moment(startDt).diff(moment()));

    const formattedDuration =
      format === 'hour' ? duration.asHours() : duration.asMinutes();
    return Math.floor(formattedDuration);
  };

  const remainingHour = event ? getRemainingTime(event.start_datetime) : -1;
  const remainingMiunte = event
    ? getRemainingTime(event.start_datetime, 'min')
    : -1;

  const winnerMarkets =
    event.markets && event.markets.find((market) => market.slug === 'winner');

  return (
    <div className={styles.wrapperEventCard}>
      <div className={styles.eventInfoContainer}>
        <h3 className={styles.team}>
          {event.competitors!.find((c) => c.type === 'home')?.name}
        </h3>
        <h3 className={styles.team}>
          {event.competitors!.find((c) => c.type === 'away')?.name}
        </h3>
        <div className={styles.tileFooter}>
          {remainingHour > 0 ? (
            <p className={styles.eventDate}>
              In {remainingHour} Hour{remainingHour > 1 ? 's' : ''}
            </p>
          ) : remainingMiunte > 0 ? (
            <p className={styles.eventDate}>
              In {remainingMiunte} Minute
              {remainingMiunte > 1 ? 's' : ''}
            </p>
          ) : (
            <p className={`${styles.eventDate} ${styles.live}`}>
              {remainingMiunte * -1}'
            </p>
          )}

          <p className={styles.marketCount}>
            {event.markets!.length} Markets Avaliable
          </p>
        </div>
      </div>
      {/** Winner Markets */}
      {winnerMarkets && winnerMarkets.contracts && (
        <div className={styles.contractItems}>
          {winnerMarkets.contracts.map((contract) => (
            <div className={styles.contractItem} key={contract.id}>
              <h5 className={styles.contractLabel}>{contract.name}</h5>
              <div className={styles.currentPrice}>
                <div className={styles.offer}>
                  <p className={styles.price}>
                    {contract.quote!.offers.length > 0
                      ? (10000 / contract.quote!.offers[0].price).toFixed(2)
                      : '--'}
                  </p>
                  <p className={styles.stake}>
                    £
                    {contract.quote!.offers.length > 0
                      ? Math.floor(
                          (contract.quote!.offers[0].quantity *
                            contract.quote!.offers[0].price) /
                            100000000,
                        )
                      : '--'}
                  </p>
                </div>
                <div className={styles.bid}>
                  <p className={styles.price}>
                    {contract.quote!.bids.length > 0
                      ? (10000 / contract.quote!.bids[0].price).toFixed(2)
                      : '--'}
                  </p>
                  <p className={styles.stake}>
                    £
                    {contract.quote!.bids.length > 0
                      ? Math.floor(
                          (contract.quote!.bids[0].quantity *
                            contract.quote!.bids[0].price) /
                            100000000,
                        )
                      : '--'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCard;
