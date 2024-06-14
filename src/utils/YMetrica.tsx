import React from "react";
import { YMInitializer } from "react-yandex-metrika";

interface YandexMetrikaProps {
  counterId: number;
}

const YandexMetrika: React.FC<YandexMetrikaProps> = ({ counterId }) => {
  return (
    <YMInitializer
      accounts={[counterId]}
      options={{
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      }}
    />
  );
};

export default YandexMetrika;
