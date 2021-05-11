import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import ListSkeleton from '@/components/ListSkeleton';
import { useParams } from 'react-router-dom';
import * as api from '@/services';
import { Tabs } from 'antd';
import ContractCard from '@/components/ContractCard';
import { getRemainingTime, parseLeagueFromSlug } from '@/utils';

import styles from './index.module.scss';
import { markTimeline } from 'console';
import moment from 'moment';

const { TabPane } = Tabs;

interface IDetailProps {}

const Detail: React.FunctionComponent<IDetailProps> = (props) => {
  const { eventId }: { eventId: string } = useParams();
  const [event, setEvent] = useState<EventDetail | null>(null);

  const getEventsDetail = async (eventIds: string[]) => {
    try {
      const { data } = await api.getEventDetail(eventIds);
      return data;
    } catch (e) {
      alert('API Failed, please try again');
      return null;
    }
  };

  const getEventsMarkets = async (eventIds: string[]) => {
    try {
      const { data } = await api.getMarkets(eventIds);
      return data;
    } catch (e) {
      alert('API Failed, please try again');
      return null;
    }
  };

  const getCompetitors = async (eventIds: string[]) => {
    try {
      const { data } = await api.getCompetitors(eventIds);
      return data;
    } catch (e) {
      alert('API Failed, please try again');
      return null;
    }
  };

  const getContracts = async (marketIds: string[]) => {
    try {
      const { data } = await api.getMarketsContracts(marketIds);
      return data;
    } catch (e) {
      alert('API Failed, please try again');
      return null;
    }
  };

  const getQuotes = async (marketIds: string[]) => {
    try {
      const { data } = await api.getMarketsQuotes(marketIds);
      return data;
    } catch (e) {
      alert('API Failed, please try again');
      return null;
    }
  };

  const getVolumes = async (marketIds: string[]) => {
    try {
      const { data } = await api.getMarketsVolume(marketIds);
      return data;
    } catch (e) {
      alert('API Failed, please try again');
      return null;
    }
  };

  const fetchAllEvents = async () => {
    // Get All Popular Events Details
    const allEventsDetail = await getEventsDetail([eventId]);
    if (allEventsDetail) {
      const allEvents = allEventsDetail.events;

      // Get Events Competitors
      const allEventsCompetitors = await getCompetitors([eventId]);

      // Match Events Competitors to Details
      if (allEventsCompetitors) {
        allEventsCompetitors.competitors.forEach((competitor) => {
          const event = allEvents.find(
            (event) => event.id === competitor.event_id,
          );
          if (event) {
            if (typeof event.competitors === 'undefined') {
              event.competitors = [];
            }
            event.competitors!.push(competitor);
          }
        });
      }

      // Get Events Markets
      const allEventsMarkets = await getEventsMarkets([eventId]);

      // Winner Markets IDs
      const winnerMarkets: Market[] = [];

      // Match Events Markets to Details
      if (allEventsMarkets) {
        allEventsMarkets.markets.forEach((market) => {
          const event = allEvents.find((event) => event.id === market.event_id);
          if (event) {
            if (typeof event.markets === 'undefined') {
              event.markets = [];
            }
            event.markets!.push(market);
          }

          winnerMarkets.push(market);
        });
      }

      // Get all contracts
      const allContracts = await getContracts(
        winnerMarkets.map((market) => market.id),
      );

      const allWinnerContracts: Contract[] = [];
      // Match contracts to market
      if (allContracts) {
        allContracts.contracts.forEach((contract) => {
          const market = winnerMarkets.find(
            (market) => market.id === contract.market_id,
          );
          if (market) {
            if (typeof market.contracts === 'undefined') {
              market.contracts = [];
            }
            market.contracts!.push(contract);
            allWinnerContracts.push(contract);
          }
        });
      }

      // Get all quotes for winner contracts
      const allQuotes = await getQuotes(
        winnerMarkets.map((market) => market.id),
      );
      // Match quotes  to contract
      if (allQuotes) {
        Object.keys(allQuotes).forEach((contractId) => {
          const contract = allWinnerContracts.find(
            (contract) => contract.id === contractId,
          );
          if (contract) {
            contract.quote = allQuotes[contractId];
          }
        });
      }

      const allVolumes = await getVolumes(
        winnerMarkets.map((market) => market.id),
      );

      // Match quotes  to contract
      if (allVolumes) {
        allVolumes.volumes.forEach((volume) => {
          const contract = winnerMarkets.find(
            (market) => market.id === volume.market_id,
          );
          if (contract) {
            contract.volumes = volume;
          }
        });
      }

      setEvent(allEvents.length > 0 ? allEvents[0] : null);
      console.log('allEvents', allEvents);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const remainingHour = event ? getRemainingTime(event.start_datetime) : -1;
  const remainingMiunte = event
    ? getRemainingTime(event.start_datetime, 'min')
    : -1;

  const getAllMarkets = () => {
    const result = [];
    const map = new Map();
    if (event && event.markets) {
      for (const market of event.markets) {
        if (!map.has(market.category)) {
          map.set(market.category, true); // set any value to Map
          result.push(market);
        }
      }
    }
    return result;
  };

  return (
    <MainLayout>
      {event ? (
        <div>
          <div className={styles.eventInfoContainer}>
            <h1 className={styles.team}>{event.name}</h1>
            <h3 className={styles.teamName}>
              <span>Home</span>
              {event.competitors!.find((c) => c.type === 'home')?.name}
            </h3>
            <h3 className={styles.teamName}>
              <span>Away</span>
              {event.competitors!.find((c) => c.type === 'away')?.name}
            </h3>
            <h3 className={styles.teamName}>
              <span>League</span>
              {parseLeagueFromSlug(event.full_slug)}
            </h3>
            <h3 className={styles.teamName}>
              <span>Start</span>
              {moment(event.start_datetime).format('YYYY-MM-DD HH:mm:ss')}
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
          <Tabs defaultActiveKey="all">
            <TabPane tab="All" key={'all'}>
              {event &&
                event.markets &&
                event.markets.map((market) => (
                  <ContractCard key={market.id} market={market} />
                ))}
            </TabPane>
            {getAllMarkets().map((market) => (
              <TabPane tab={market.category} key={market.category}>
                {event &&
                  event.markets &&
                  event.markets
                    .filter((m) => m.category === market.category)
                    .map((market) => (
                      <ContractCard key={market.id} market={market} />
                    ))}
              </TabPane>
            ))}
          </Tabs>
        </div>
      ) : (
        <ListSkeleton />
      )}
    </MainLayout>
  );
};

export default Detail;
