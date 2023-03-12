import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventSearch";
import { getData } from "@/helper-firebase-db/helper-fd";
import { useRouter } from "next/router";
import React from "react";

const Events = ({events}) => {
  const router = useRouter();
  const onSearch = (year,month) =>{
    const path = `event/${year}/${month}`;
    router.push(path);
  }
  return (
    <>
      <EventsSearch onSearch={onSearch} />
      <EventList items={events}></EventList>
    </>
  );
};

export async function getStaticProps(){
  const data = await getData();

  return {
    props:{
      events: data
    },
    revalidate:60
  }
}

export default Events;
