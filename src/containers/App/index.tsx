import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import EventCard from '@/components/EventCard';
import ListSkeleton from '@/components/ListSkeleton';
import * as api from '@/services';
import { ReactComponent as SmarketsLogo } from '@/assets/smarkets-logo.svg';
import MainLayout from '@/components/MainLayout';

import styles from './index.module.scss';

const { Header, Content, Footer } = Layout;

function App() {
  const [events, setEvents] = useState<EventDetail[] | null>(null);

  const getEvents = async () => {
    try {
      const { data } = await api.getEvents();
      return data;
    } catch (e) {
      alert('API Failed, please try again');
      return null;
    }
  };

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
    // Get All Popular Events
    const eventList = await getEvents();
    if (eventList) {
      // Get All Popular Events Details
      const allEventsDetail = await getEventsDetail(
        eventList.popular_event_ids,
      );
      if (allEventsDetail) {
        const allEvents = allEventsDetail.events;

        // Get Events Competitors
        const allEventsCompetitors = await getCompetitors(
          eventList.popular_event_ids,
        );

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
        const allEventsMarkets = await getEventsMarkets(
          eventList.popular_event_ids,
        );

        // Winner Markets IDs
        const winnerMarkets: Market[] = [];

        // Match Events Markets to Details
        if (allEventsMarkets) {
          allEventsMarkets.markets.forEach((market) => {
            const event = allEvents.find(
              (event) => event.id === market.event_id,
            );
            if (event) {
              if (typeof event.markets === 'undefined') {
                event.markets = [];
              }
              event.markets!.push(market);
            }

            if (market.slug === 'winner') {
              winnerMarkets.push(market);
            }
          });
        }

        // Get all winner contracts
        const allContracts = await getContracts(
          winnerMarkets.map((market) => market.id),
        );

        const allWinnerContracts: Contract[] = [];
        // Match Winner contracts to market
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

        setEvents(allEvents);
        console.log('allEvents', allEvents);
      }
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);
  return (
    <MainLayout>
      <h3 className={styles.title}>Top Football Events.</h3>
      <div className="site-layout-content">
        {events === null ? (
          <ListSkeleton />
        ) : (
          <div>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default App;
