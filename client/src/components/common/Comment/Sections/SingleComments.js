import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";

function SingleComments(props) {
  const [openReply, setOpenReply] = useState(false);
  const [comment, setComment] = useState("");

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };
  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const user = useSelector((state) => state.user);

  const onSubmit = (e) => {
    e.preventDefault(); // 꼭 넣어주기
    const variables = {
      content: comment,
      writer: user.userData._id, // redux에 저장된 userData 값 가져오기
      post: props.postId,
      responseTo: props.comment._id, // 답글을 위한 정보는 comment._id로 식별한다.
    };
    Axios.post("/api/comment/saveComment", variables).then((res) => {
      if (res.data.success) {
        console.log(res.data.result);
        // setComment("")
      } else {
        alert("댓글을 저장하지 못했습니다.");
      }
    });
  };
  return (
    <div>
      {/* 댓글 */}
      <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mt-6">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={props.comment.writer.image}
                alt={props.comment.writer.name}
              />
              {props.comment.writer.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <time
                pubdate
                //  dateTime={date}
                //  title={new Date(date).toDateString()}
              >
                {/* {new Date(date).toDateString()} */}
              </time>
            </p>
          </div>
          <button
            id="dropdownCommentButton"
            data-dropdown-toggle="dropdownComment"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
            <span className="sr-only">Comment settings</span>
          </button>
          <div
            id="dropdownComment"
            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownMenuIconHorizontalButton"
            >
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Remove
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Report
                </a>
              </li>
            </ul>
          </div>
        </footer>
        <p className="text-gray-500 dark:text-gray-400">
          {props.comment.content}
        </p>
        <div className="flex items-center mt-4 space-x-4">
          <button
            onClick={onClickReplyOpen}
            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
          >
            <svg
              className="mr-1.5 w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
            </svg>
            Reply
          </button>
        </div>
      </article>

      {/* 답글 남기는 부분 */}
      {openReply && (
        <form className="mt-6" onSubmit={onSubmit}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              value={comment}
              onChange={handleChange}
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            onClick={onSubmit}
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Comment
          </button>
        </form>
      )}
    </div>
  );
}

export default SingleComments;
