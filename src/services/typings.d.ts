interface EventList {
  popular_event_ids: string[];
}

interface EventDetail {
  bet_allowed: boolean;
  bettable: boolean;
  chart_time_period: null;
  created: string;
  description: string | null;
  display_order: number;
  end_date: string | null;
  full_slug: string;
  hidden: boolean;
  id: string;
  inplay_enabled: boolean;
  modified: string;
  name: string;
  parent_id: string;
  seo_description: string | null;
  short_name: string;
  slug: string;
  special_rules: string | null;
  start_date: string;
  start_datetime: string;
  state: string;
  type: string;
  competitors?: Competitors[] | null;
  markets?: Market[] | null;
}

interface EventDetailList {
  events: EventDetail[];
}

interface Competitors {
  event_id: string;
  id: string;
  info: {};
  name: string;
  short_code: string | null;
  short_name: string;
  slug: string;
  type: string;
}

interface Market {
  bet_delay: number;
  cashout_enabled: boolean;
  category: string;
  complete: boolean;
  contract_selections: null;
  created: string;
  description: string;
  display_order: number;
  display_type: string;
  event_id: string;
  hidden: boolean;
  id: string;
  inplay_enabled: boolean;
  market_type: {
    name: string;
  };
  modified: string;
  name: string;
  slug: string;
  state: string;
  winner_count: number;
  contracts?: Contract[];
  volumes?: Volume[];
}

interface Contract {
  competitor_id: string;
  contract_type: {
    name: string;
  };
  created: string;
  display_order: number;
  hidden: boolean;
  id: string;
  info: {};
  market_id: string;
  modified: string;
  name: string;
  outcome_timestamp: string | null;
  slug: string;
  state_or_outcome: string;
  quote?: Quote;
}

interface Volume {
  double_stake_volume: number;
  market_id: string;
  volume: number;
}

interface Quote {
  bids: {
    price: number;
    quantity: number;
  }[];
  offers: {
    price: number;
    quantity: number;
  }[];
}

interface Quotes {
  [key: string]: Quote;
}
