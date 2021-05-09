import request from '@/utils/request';
import { AxiosPromise } from 'axios';

export function getEvents(): AxiosPromise<EventList> {
  return request(`/popular/event_ids/sport/football/`);
}

export function getEventDetail(
  eventIds: String[],
): AxiosPromise<EventDetailList> {
  return request(`/events/${eventIds.join(',')}/`);
}

export function getCompetitors(
  eventIds: String[],
): AxiosPromise<{ competitors: Competitors[] }> {
  return request(`/events/${eventIds.join(',')}/competitors/`);
}

export function getMarkets(
  eventIds: String[],
): AxiosPromise<{ markets: Market[] }> {
  return request(`/events/${eventIds.join(',')}/markets/`);
}

export function getMarketsContracts(
  marketIds: String[],
): AxiosPromise<{ contracts: Contract[] }> {
  return request(`/markets/${marketIds.join(',')}/contracts/`);
}

export function getMarketsVolume(
  marketIds: String[],
): AxiosPromise<{ volumes: Volume[] }> {
  return request(`/markets/${marketIds.join(',')}/volumes/`);
}

export function getMarketsQuotes(marketIds: String[]): AxiosPromise<Quotes> {
  return request(`/markets/${marketIds.join(',')}/quotes/`);
}
