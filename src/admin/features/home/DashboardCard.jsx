import { Grid, HStack } from "@chakra-ui/react";
import logo from "../../../assets/Icon.png";
import greenlogo from "../../../assets/Icon (4).png";
import yellowlogo from "../../../assets/Icon (5).png";
import redlogo from "../../../assets/Icon (6).png";

import { ReusableCard } from "../../components/Card/ReusableCard";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";

export function DashboardCard() {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const userRes = await axiosClient.get("/users");
        setUsers(userRes.data.users);
        const orgRes = await axiosClient.get("/get-organizations");

        setOrganizations(orgRes.data.organizations);
        const mentorRes = await axiosClient.get("/get-mentors");
        setMentors(mentorRes.data.mentors);

        const listRes = await axiosClient.get("/get-all-listings");

        setListings(listRes.data.listings);
      } catch (err) {
        console.log(err);
      }
    };
    getAllData();
  }, []);
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap="2"
    >
      <ReusableCard
        title={"Total users"}
        description={users ? users.length : "0"}
        image={logo}
        rate={"8.5%"}
        current={"up"}
        color={"#00B69B"}
        //  arrows={<IoIosTrendingUp />}
        timestamp={"yesterday"}
      />
      <ReusableCard
        title={"Total Organizations"}
        description={organizations ? organizations.length : "0"}
        image={yellowlogo}
        rate={"8.5%"}
        color={"#00B69B"}
        arrows={<IoIosTrendingUp />}
        current={"up"}
        timestamp={"yesterday"}
      />
      <ReusableCard
        title={"Total Offer Amount"}
        description={`$${mentors ? mentors.length : "0"}`}
        color={"#00B69B"}
        arrows={<IoIosTrendingDown />}
        image={greenlogo}
        rate={"8.5%"}
        current={"up"}
        timestamp={"yesterday"}
      />
      <ReusableCard
        title={"Pending withdrawals"}
        description={listings ? listings.length : "0"}
        image={redlogo}
        rate={"8.5%"}
        current={"up"}
        timestamp={"yesterday"}
      />
    </Grid>
  );
}
