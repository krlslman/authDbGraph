import { useState, useEffect } from "react";
import axios from "axios";
import CommentItem from "./CommentItem";
import { useStateContext } from "/src/context/StateContext";

const MongoDBInteractions = () => {
  const { user } = useStateContext();
  const [comments, setComments] = useState(null);
  // console.log(user);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios
          .get(`/api/comment?user=${user.email}`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [user.email]);
  console.log(comments);

  return (
    <div>
      <ul className="flex flex-wrap list-none justify-center gap-2">
        {comments ? (
          comments.map((comment) => (
            <>
              <CommentItem comment={comment}  />
            </>            
          ))
        ) : (
          <p>LOADING...</p>
        )}
      </ul>
    </div>
  );
};

export default MongoDBInteractions;




