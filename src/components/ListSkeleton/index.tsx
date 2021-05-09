import React from 'react';
import { Skeleton, Space } from 'antd';
import QueueAnim from 'rc-queue-anim';

import styles from './index.module.scss';

interface IEventCardProps {}

const EventCard: React.FunctionComponent<IEventCardProps> = (props) => {
  return (
    <div>
      {
        <QueueAnim
          animConfig={[{ opacity: [1, 0], translateY: [0, 30] }, { height: 0 }]}
          ease={['easeOutQuart', 'easeInOutQuart']}
          duration={[550, 450]}
          interval={150}
          delay={500}
        >
          <div className={styles.wrapperEventCard} key={1}>
            <Skeleton.Input style={{ width: 300 }} active={true} />
            <div style={{ marginTop: 8 }}>
              <Skeleton.Input
                style={{ width: 100, marginRight: 8 }}
                active={true}
                size="small"
              />
              <Skeleton.Input
                style={{ width: 50, marginRight: 8 }}
                active={true}
                size="small"
              />
              <Skeleton.Input
                style={{ width: 50 }}
                active={true}
                size="small"
              />
            </div>
          </div>{' '}
          <div className={styles.wrapperEventCard} key={2}>
            <Skeleton.Input style={{ width: 300 }} active={true} />
            <div style={{ marginTop: 8 }}>
              <Skeleton.Input
                style={{ width: 100, marginRight: 8 }}
                active={true}
                size="small"
              />
              <Skeleton.Input
                style={{ width: 50, marginRight: 8 }}
                active={true}
                size="small"
              />
              <Skeleton.Input
                style={{ width: 50 }}
                active={true}
                size="small"
              />
            </div>
          </div>
          <div className={styles.wrapperEventCard} key={3}>
            <Skeleton.Input style={{ width: 300 }} active={true} />
            <div style={{ marginTop: 8 }}>
              <Skeleton.Input
                style={{ width: 100, marginRight: 8 }}
                active={true}
                size="small"
              />
              <Skeleton.Input
                style={{ width: 50, marginRight: 8 }}
                active={true}
                size="small"
              />
              <Skeleton.Input
                style={{ width: 50 }}
                active={true}
                size="small"
              />
            </div>
          </div>
        </QueueAnim>
      }
    </div>
  );
};

export default EventCard;
