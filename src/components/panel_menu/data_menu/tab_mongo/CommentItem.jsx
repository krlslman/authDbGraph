/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import axios from "axios";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import { useStateContext } from "/src/context/StateContext";

const CommentItem = ({ comment }) => {
  const { user } = useStateContext();
  // console.log(user);
  return (
      <li
        key={comment._id}
        className="flex flex-col gap-2 w-full max-w-sm bg-white border shadow-2xl
            border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 p-5"
      >
        <div className="flex justify-start items-center gap-2">
          {user.picture ? (
            <Avatar size="large" icon={<UserOutlined />} />
          ) : (
            <Avatar size="large" icon={<UserOutlined />} />
          )}
          <div className="flex justify-between w-full">
            <div>
              <h5 className="mb-1 mr-5 text-xl font-medium text-gray-900 dark:text-white"
                style={{maxWidth:"180px", overflow:"hidden"}}
              >
                {comment.user}
              </h5>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {moment(comment.timestamp).fromNow()}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-900 dark:text-white mx-2 mb-0">
            {comment.text}
          </p>
        </div>

        <div className="flex flex-col items-end pt-2">
          <LikeButton comment={comment} />
        </div>
      </li>
  );
};
export default CommentItem;




const LikeButton = ({ comment }) => {
  const { user } = useStateContext();

  const [isLiked, setIsLiked] = useState(comment.isLiked || false);
  const [likesCount, setLikesCount] = useState(comment.likesCount)

  const handleLike = async () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);

    const newdata = {
      id: comment._id,
      newLiker: [user.email],
    };

    axios
      .patch(`/api/comment/like`, { newdata: newdata })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  };

  return (
    <button
      ey={comment._id}
      className={`bg-transparent flex items-center p-0`}
      onClick={handleLike}
      style={{minWidth:"35px", minHeight:"25px"}}
    >
      {isLiked ? (
        <svg fill="red" height={20} width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>
      ) : (
        <svg fill="red" height={20} width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path></svg>
      )}

      {likesCount > 0 && <span className="text-slate-400 pl-1">{likesCount}</span>}
    </button>
  );
};
