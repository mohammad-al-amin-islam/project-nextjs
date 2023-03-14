import classes from "./comment-list.module.css";

function CommentList({ items }) {
  const { id, name } = items;
  console.log(items)
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {items.map((comment) => (
        <li key={comment.id}>
          <p>{comment.username} is amazing!</p>
          <div>
            By <address>{comment.username}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
