import { useState, useEffect } from "react";
import axios from "axios";
import CommentItem from "./CommentItem";
import { useStateContext } from "/src/context/StateContext";

const MongoDBInteractions = () => {
  const { user } = useStateContext();
  const [comments, setComments] = useState(null);
  const [commentText, setCommentText] = useState('');
  console.log(user);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comment?user=${user.email}`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [user.email]);
  console.log(comments);

  const handleCommentSubmit = () => {
    const newComment = {
      user: user.given_name || user.family_name || user.email.split('@')[0],
      text: commentText,
      likeList: [],
      timestamp: new Date().toISOString(),
    };

    // Make a POST request to the API route
    axios.post('/api/comment/post', newComment)
      .then((response) => {
        // Handle the response if needed
        console.log(response);
        // Reset the comment text input
        setCommentText('');
      })
      .catch((error) => {
        // Handle the error if needed
        console.error(error);
      });
  };

  return (
    <div>
      {/* <div className=""> */}
      <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2 mx-auto mb-10 shadow-2xl" onSubmit={handleCommentSubmit}>
        <div className="flex flex-wrap -mx-2 mb-6">
          <h4 className="px-4 pt-3 pb-2 text-gray-800">Add a new comment</h4>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-small placeholder-gray-700 focus:outline-none focus:bg-white"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              name="body"
              placeholder="Type Your Comment"
              required
            ></textarea>
          </div>
          <div className="flex flex-col w-full md:w-full items-end px-3">
            <div className="mr-1">
              <input
                type="submit"
                className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                value="Post Comment"
              />
            </div>
            <div className="flex items-start text-gray-700 p-2 m-auto opacity-50">
              <svg
                fill="none"
                className="w-5 h-5 text-gray-600 mr-1"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs md:text-sm">
                Be respectful and refrain from using offensive language or
                engaging in personal attacks.
              </p>
            </div>
          </div>
        </div>
      </form>
      {/* </div> */}

      <ul className="flex flex-wrap list-none justify-center gap-2">
        {comments ? (
          comments.map((comment) => (
            <>
              <CommentItem comment={comment} />
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
