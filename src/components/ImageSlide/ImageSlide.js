import React from "react";

const ImageSlide = (src) => {
  let styling = {
    width: 100 + "%",
  };

  return <img src={src} alt="slider-image" style={styling}></img>;
};

export default ImageSlide;
