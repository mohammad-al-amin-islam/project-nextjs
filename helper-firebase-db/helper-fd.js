export async function getData() {
  const res = await fetch(
    "https://nextjs-e5c88-default-rtdb.firebaseio.com/events.json"
  );
  const data = await res.json();

  const filteredData = [];
  for (const key in data) {
    filteredData.push({
      id: key,
      ...data[key],
    });
  }

  return filteredData;
}

export async function getFeaturedEvents() {
  const data = await getData();
  return data.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const data = await getData();
  return data.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const data = await getData();
  const { year, month } = dateFilter;

  let filteredEvents = data.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
