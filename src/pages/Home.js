import React from "react";
import Header from "../components/Header";
import withRoot from "../components/Hoc/withRoot";
import Map from "../components/Map";

const Home = () => {
  return (
    <>
      <Header />
      <Map />
    </>
  );
};

export default withRoot(Home);
