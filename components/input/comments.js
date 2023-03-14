import { useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function Comments(props) {
  const { id } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    
      // setIsFetching(true)
      fetch(`/api/comments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // setIsFetching(false);
        setComments(data.comments)
      });
   
  }, [showComments,comments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData, event) {
    fetch(`/api/comments/${id}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        event.target.reset();
        console.log(data);
        toast.success("Comments added successfully")
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
      {/* {showComments && isFetching && <p>Loading...</p>} */}
    </section>
  );
}

export default Comments;
