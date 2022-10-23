import type { GetServerSideProps, NextPage } from "next";
import { Fragment } from "react";
import HouseDetails from "../../components/houseDetails/houseDetails";
import SEO from "../../components/seo";
import axios from "../../utils/axios";
import House from "../../utils/types/house";

const HouseDetailsPage: NextPage<{ data: House; isError: boolean }> = ({
  data,
  isError,
}) => {
  return (
    <Fragment>
      <SEO
        title={`House | ${data.name}`}
        desc={data.coatOfArms}
        linkRel={""}
        linkHref={""}
      />
      {isError ? (
        <h1>Oops something went wrong with the server</h1>
      ) : (
        <HouseDetails data={data} />
      )}
    </Fragment>
  );
};

export default HouseDetailsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const response = await axios.get(`/houses/${id}`);

  if (response.data) {
    return {
      props: {
        data: response.data,
        isError: false,
      },
    };
  }
  return {
    props: {
      isError: true,
      data: null,
    },
  };
};
