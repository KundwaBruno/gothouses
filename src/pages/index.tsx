import type { NextPage } from "next";
import { Fragment } from "react";
import Houses from "../components/houses";
import SEO from "../components/seo";

const Home: NextPage = () => {
  return (
    <Fragment>
      <SEO
        title='Games of Thrones | Houses'
        desc='Explore the largest collection of game of thrones houses and their details'
        linkRel={""}
        linkHref={""}
      />
      <Houses />
    </Fragment>
  );
};

export default Home;
