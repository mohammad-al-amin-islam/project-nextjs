import { Fragment, useEffect, useState } from "react";
import Button from "@/components/button/button";
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/ResultTitles";
import { getFilteredEvents } from "@/helper-firebase-db/helper-fd";
import { useRouter } from "next/router";
import useSWR from "swr";

function FilteredEventsPage({ isErorr, events, dates }) {
  const router = useRouter();
  const filterData = router.query.slug;
  const [loadedData, setLoadedData] = useState([]);

  //client data fetching
  const { data, error } = useSWR(
    "https://nextjs-e5c88-default-rtdb.firebaseio.com/events.json",
    (url) =>
      fetch(url).then((res) =>
        res.json().then((data) => {
          const filteredDatas = [];
          for (const key in data) {
            filteredDatas.push({
              id: key,
              ...data[key],
            });
          }
          setLoadedData(filteredDatas);
        })
      )
  );

  useEffect(() => {}, [data]);

  if (!filterData || !loadedData) {
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
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <p>Invalid filter. Please adjust your values!</p>
        <div className="center">
          <Button link="/event">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // if (isErorr) {
  //   return (
  //     <Fragment>
  //       <p>Invalid filter. Please adjust your values!</p>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </Fragment>
  //   );
  // }

  let filteredEvents = loadedData.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // const filteredEvents = events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p className="center">No event found for the given filter</p>;
  }
  // const date = new Date(dates.year, dates.month - 1);
  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date}></ResultsTitle>
      <EventList items={filteredEvents} />
    </Fragment>
  );
}


//server side data fetching

// export async function getServerSideProps(context) {
//   const filterData = context.params.slug;
//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { isErorr: true },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       dates: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
