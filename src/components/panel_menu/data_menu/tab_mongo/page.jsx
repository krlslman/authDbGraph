/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useStateContext } from "/src/context/StateContext";
import axios from "axios";

import React from "react";
import commentContainer from "./commentContainer";

const MongoDBInteractions = () => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    axios
      .get("/api/comment")
      .then((res) => {
        console.log(res);
        setComments(res.data.datam);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("istanbul: ", comments); // Log the updated state value
  }, [comments]);

  


  return (
    <div>

      <ul className="flex flex-wrap list-none justify-center gap-2">
        {comments
          ? comments.map((comment) => (
              <>
                {/* <li key={comment._id}>{comment.text}</li> */}

                <li class="w-full  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
                  <div class="flex justify-start items-center">
                    <img
                      className="w-16 h-16 object-cover mb-3 mr-3 rounded-full shadow-lg"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwFE9UxzB8QrAEsRfLyJKLfTDkAqNtHmoKg&usqp=CAU"
                      alt="Bonnie image"
                    />
                    <div className="flex justify-between w-full">
                      <div>
                        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                          Selman Koral
                        </h5>
                        <p class="text-sm text-gray-500 dark:text-gray-400 pl-1">
                          Software Enginner
                        </p>
                      </div>
                      <div className="">
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          10:15
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <p class="text-sm text-gray-900 dark:text-white px-2 mb-0">
                      Implemented a radio button change event handler to filter
                      data based on selected options. Used state variables to
                      store and update filtered data. Applied array filtering to
                      retrieve
                    </p>
                  </div>

                  <div class="flex flex-col items-center pb-2">
                    <LikeButton />
                  </div>
                </li>
              </>
            ))
          : "NO DATA"}
      </ul>
    </div>
  );
};

export default MongoDBInteractions;


export const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    if (liked) {
      // Unlike the comment
      setLikes((prevLikes) => prevLikes - 1);
      setLiked(false);
    } else {
      // Like the comment
      setLikes((prevLikes) => prevLikes + 1);
      setLiked(true);
    }
  };

  return (
    <button className="bg-transparent" onClick={handleLike}>
      <i className={`ri-heart-line text-red-500 ${liked ? 'bg-red-900' : ''}`}></i>
      {likes} Likes
    </button>
  );
};
