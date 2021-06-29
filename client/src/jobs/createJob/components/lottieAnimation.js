import React from "react";
import Lottie from "react-lottie";

const LottieAnimation = ({ lottie, width, height, loop }) => {
  const defaultOptions = {
    loop: loop,
    autoplay: true,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default LottieAnimation;
