import { Liquid } from "@ant-design/plots";

type Props = {
    progress: number
}
export const LiquidProgress = ({progress}: Props) => {
  const config = {
    percent: progress,
    style: {
      outlineBorder: 15,
      outlineDistance: 8,
      waveLength: 228,
    },
  };
  return <Liquid {...config} />;
};

