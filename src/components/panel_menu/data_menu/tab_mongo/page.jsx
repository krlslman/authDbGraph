/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useStateContext } from "/src/context/StateContext";
import axios from "axios";
import {
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Avatar } from "antd";
import moment from 'moment';


const MongoDBInteractions = () => {
  const { user } = useStateContext();
  const [comments, setComments] = useState(null);

  useEffect(() => {
    axios
      // .get(`/api/comment/comment?user=${encodeURIComponent(user.email)}`,)
      .get(`/api/comment/comment?user=selmankorall@gmail.com`,)
      .then((res) => {
        console.log(res);
        setComments(res.data);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  
  console.log(comments);
  // console.log(comments[0].isLiked);
  // console.log(comments[0].bune);
  // console.log(comments[0].likeList.includes(comments[0].meyil));


  return (
    <div>

      <ul className="flex flex-wrap list-none justify-center gap-2">
        {comments
          ? comments.map((comment) => (
              <>
                <li key={comment.id} class="flex flex-col gap-2 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
                  <div class="flex justify-start items-center gap-2">
                    { user.picture
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={user.picture} alt="" style={{maxHeight:"40px", borderRadius:"999px"}}/>
                      : <Avatar size="large" icon={<UserOutlined />} /> }
                    <div className="flex justify-between w-full">
                      <div>
                        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                          {comment.user}
                        </h5>
                        {/* <p class="text-sm text-gray-500 dark:text-gray-400 pl-1">
                          Software Enginner
                        </p> */}
                      </div>
                      <div className="">
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          {/* {comment.timestamp} */}
                          {moment(comment.timestamp).fromNow()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <p class="text-sm text-gray-900 dark:text-white mx-2 mb-0">
                    {comment.text}
                    </p>
                  </div>

                  <div class="flex flex-col items-end pb-2">
                    <LikeButton comment={comment} user={user} />
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


export const LikeButton = ({ comment, user}) => {
  const [likedUi, setLikedUi] = useState(false);
  const [likesUi, setLikesUi] = useState(comment.likes);
  

  const handleLike = (comment, user) => {
    if (likedUi) {  // Unlike the comment      
      setLikesUi((prevLikes) => prevLikes - 1);
      setLikedUi(false);
    } else {  // Like the comment
      setLikesUi((prevLikes) => prevLikes + 1);
      setLikedUi(true);
    }

    const newdata = {
      newLiker: likedUi ? [] : [user.email], // user.email is a string value
    };

    axios
      .patch(`/api/comment/${comment._id}`, { newdata: newdata })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <button className={` bg-transparent flex items-center ${comment.isLiked?"bg-pink-900":"bg-blue-100" }`} onClick={() => handleLike(comment,user)}>
      <i className={`ri-heart-line text-red-500 text-xl ${likedUi ? 'bg-red-900' : ''}`}></i>
      {parseInt(comment.likes) > 0 && <span className="text-slate-400 pl-1">{comment.likes}</span>}
    </button>
  );
};
