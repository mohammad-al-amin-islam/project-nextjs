import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/EventSearch";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import React from "react";

const Events = () => {
  const events = getAllEvents();
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

export default Events;
