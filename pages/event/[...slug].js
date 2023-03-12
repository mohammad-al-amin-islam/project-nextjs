import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "@/dummy-data";
import Button from "@/components/button/button";
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/ResultTitles";
// import '../../styles/globals.css'

function FilteredEventsPage(props) {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <p>Invalid filter. Please adjust your values!</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p className="center">No event found for the given filter</p>;
  }
  const date = new Date(numYear,numMonth-1)

  return (
    <Fragment>
      <ResultsTitle date={date} ></ResultsTitle>
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
