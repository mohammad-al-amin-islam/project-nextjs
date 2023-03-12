import Button from '../button/button';
import classes from './ResultTitles.module.css';

function ResultsTitle(props) {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className={classes.title}>
      <h1 style={{marginBottom:"50px"}}>Events in {humanReadableDate}</h1>
      <Button  link='/event'>Show all events</Button>
    </section>
  );
}

export default ResultsTitle;