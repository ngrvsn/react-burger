import React, { FC } from 'react';
import Feed from './feed/feed';
import FeedSection from './feed-section/feed-section';
import styles from './feed-archive.module.css'


const FeedArchive: FC = () => {

    return (
        <section className={styles.section}>
            <Feed />
            <FeedSection />
        </section>
    );
};

export {FeedArchive}