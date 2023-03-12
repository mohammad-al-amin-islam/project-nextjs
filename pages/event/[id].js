import { Fragment } from "react";
import Head from "next/head";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getData, getEventById } from "@/helper-firebase-db/helper-fd";

function EventDetailPage({ event }) {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;
  console.log(id);
  const filterData = await getEventById(id);

  return {
    props: {
      event: filterData,
    },
  };
}

export async function getStaticPaths() {
  const allData = await getData();
  const readyParams = allData.map((data) => ({ params: { id: data.id } }));

  return{
    paths:readyParams,
    fallback:false
  }
}

export default EventDetailPage;
