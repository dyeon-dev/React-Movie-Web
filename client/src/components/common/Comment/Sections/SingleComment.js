import React, { useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import LikeDislike from "./\bLikeDislike";

function SingleComment(props) {
  const [openReply, setOpenReply] = useState(false);
  const [comment, setComment] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [editedContent, setEditedContent] = useState(props.comment.content);
  const [isEditing, setIsEditing] = useState(false);

  const onClickReplyOpen = () => {
    setOpenReply(!openReply);
  };
  
  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const handleEditChange = (e) => {
    setEditedContent(e.currentTarget.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const user = useSelector((state) => state.user);

  const onSubmit = (e) => {
    e.preventDefault(); // 꼭 넣어주기
    const variables = {
      content: comment,
      writer: user.userData._id, // redux에 저장된 userData 값 가져오기
      movieId: props.movieId,
      responseTo: props.comment._id, // 답글을 위한 정보는 comment._id로 식별한다.
    };
    Axios.post("/api/comment/saveComment", variables).then((res) => {
      if (res.data.success) {
        console.log(res.data.result);
        setComment("");
        setOpenReply(!openReply);
        // 받아온 댓글에 대한 정보를 부모 컴포넌트로 업데이트 해주기
        props.refreshFunction(res.data.result);
      } else {
        alert("댓글을 저장하지 못했습니다.");
      }
    });
  };

  const onClickEdit = () => {
    const variables = {
      commentId: props.comment._id,
      content: editedContent
    }
      // 댓글 수정
      Axios.post("/api/comment/editComment", variables).then(
        (response) => {
          if (response.data.success) {
            props.refreshEditFunction(response.data.updatedComment);
            setIsEditing(false);
          } else {
            alert("댓글 수정을 실패했습니다.");
          }
        }
      );
  };

  const onClickRemove = () => {
    const variables = {
      commentId: props.comment._id
    }
      // 댓글 삭제
      Axios.post("/api/comment/removeComment", variables).then(
        (response) => {
          if (response.data.success) {
            const updatedComments = props.commentLists.filter(
              (comment) => comment._id !== props.comment._id
            );
            props.refreshRemoveFunction(updatedComments);
          } else {
            alert("댓글 삭제를 실패했습니다.");
          }
        }
      );
  };
  
  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* 댓글 보여주는 부분 */}
      <article className="p-6 text-base bg-gray-900 rounded-lg dark:text-white mt-6">
        {/* writer, date, toggle */}
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-white dark:text-white font-semibold">
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src="https://static-00.iconduck.com/assets.00/profile-user-icon-2048x2048-m41rxkoe.png"
                alt={props.comment.writer.name}
              />
              {props.comment.writer.name}
            </p>
            <p className="text-sm text-white dark:text-gray-400">
              <time
                pubdate="true"
                dateTime={props.comment.createdAt}
                title={new Date(props.comment.createdAt).toDateString()}
              >
                {new Date(props.comment.createdAt).toDateString()}
              </time>
            </p>
          </div>
          {/* Dropdown Button and Menu */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                id="dropdownComment1"
                className="absolute right-0 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li>
                    <a
                       onClick={() => {
                        setIsEditing(true);
                        toggleDropdown();
                      }}
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={()=> {
                        onClickRemove()
                        toggleDropdown();
                      }}
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Remove
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </footer>

        {isEditing ? (
          <div>
            <textarea
              value={editedContent}
              onChange={handleEditChange}
              rows="4"
              className="w-full p-2 mb-4 text-sm text-white bg-gray-700 rounded dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={onClickEdit}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Save
            </button>
          </div>
        ) : (
          // comment
          <p className="text-white dark:text-gray-400">
            {props.comment.content}
          </p>
        )}
        
        {/* 댓글 좋아요 / 싫어요  */}
        <LikeDislike commentId={props.comment._id} userId={localStorage.getItem('userId')} />

        {/* Reply */}
        <div className="flex items-center mt-4 space-x-4">
          <button
            onClick={onClickReplyOpen}
            className="flex items-center text-sm text-gray-300 hover:underline dark:text-gray-400 font-medium"
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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
          <div className="py-2 px-4 mb-4 bg-gray-700 rounded-lg rounded-t-lg dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              value={comment}
              onChange={handleChange}
              rows="6"
              className="px-0 w-full text-sm bg-gray-700 text-white border-0 focus:ring-0 focus:outline-none dark:bg-gray-900 dark:placeholder-gray-400 dark:bg-gray-800"
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

export default SingleComment;
