import { Composition } from "remotion";
import { Promo } from "./Promo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="NoCodeHumanPromo"
      component={Promo}
      durationInFrames={720}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
