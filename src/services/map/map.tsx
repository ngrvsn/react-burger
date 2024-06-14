import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

import styles from "./map.module.scss";

export const MapComponent = () => {
  const mapState = {
    center: [55.751574, 37.573856],
    zoom: 10,
  };

  return (
    <YMaps>
      <div className={styles.map}>
        <Map defaultState={mapState} width="100%" height="100%">
          <Placemark geometry={mapState.center} />
        </Map>
      </div>
    </YMaps>
  );
};
