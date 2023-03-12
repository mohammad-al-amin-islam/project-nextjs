import Link from "next/link";
import Button from "../button/button";
import classes from './eventItem.module.css'

function EventItem(props) {
  const { title, image, date, location, id } = props;

  const readableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedAddress = location.replace(', ', '\n');
  const link = `/event/${id}`
  return (
    <li className={classes.item}>
      <img src={image} alt={title} width={250} height={160} />
      <div className={classes.content} >
        <div >
          <h2>{title}</h2>
          <div className={classes.date} >
            <time>{readableDate}</time>
          </div>
          <div>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          {/* <Link href={`/event/${id}`}>Deatils</Link> */}
          <Button link={link}>Explore Event</Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;