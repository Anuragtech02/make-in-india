import React from "react";

const ImageSlide = (src) => {
  let styling = {
    width: 100 + "%",
  };

  return <img src={src} alt="slider" style={styling}></img>;
};

export default ImageSlide;
