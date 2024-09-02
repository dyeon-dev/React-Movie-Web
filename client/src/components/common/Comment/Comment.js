import Axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SingleComment from "./Sections/SingleComment";
import ReplyComment from "./Sections/ReplyComment";

function Comment(props) {
  const [comment, setComment] = useState("");
  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const user = useSelector((state) => state.user);

  const onSubmit = (e) => {
    e.preventDefault(); // 꼭 넣어주기
    const variables = {
      content: comment,
      writer: user.userData._id, // redux에 저장된 userData 값 가져오기
      movieId: props.movieId,
    };
    Axios.post("/api/comment/saveComment", variables).then((res) => {
      if (res.data.success) {
        setComment("");
        // 받아온 댓글에 대한 정보를 부모 컴포넌트로 업데이트 해주기
        props.refreshFunction(res.data.result);
      } else {
        alert("댓글을 저장하지 못했습니다.");
      }
    });
  };
  return (
    <>
      <section className="bg-black py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-white">
              후기를 자유롭게 남겨주세요!
            </h2>
          </div>
          {/* 답글이 없는 댓글만 Comment Lists 뿌려주기 */}
          {props.commentLists &&
            props.commentLists.map(
              (comment, index) =>
                !comment.responseTo && (
                  <React.Fragment key={index}>
                    {/* 첫번째 depth의 댓글만 보임 */}
                    <SingleComment
                      refreshFunction={props.refreshFunction}
                      refreshRemoveFunction={props.refreshRemoveFunction}
                      refreshEditFunction={props.refreshEditFunction}
                      movieId={props.movieId}
                      comment={comment}
                      commentLists={props.commentLists}
                    />
                    {/* 두번째 depth의 댓글부터 답글로 보임 */}
                    <ReplyComment
                    refreshFunction={props.refreshFunction}
                    refreshRemoveFunction={props.refreshRemoveFunction}
                    refreshEditFunction={props.refreshEditFunction}

                    // 부모댓글 id는 현재 컴포넌트의 id가 됨
                      parentCommentId={comment._id}
                      movieId={props.movieId}
                      commentLists={props.commentLists}
                    />
                  </React.Fragment>
                )
            )}

          {/* Root Comment Form */}
          <form className="mt-6" onSubmit={onSubmit}>
            <div className="py-2 px-4 mb-4 bg-gray-700 rounded-lg rounded-t-lg dark:bg-gray-800 dark:border-gray-700">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                value={comment}
                onChange={handleChange}
                rows="6"
                className="px-0 w-full text-sm bg-gray-700 text-white border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
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
        </div>
      </section>
    </>
  );
}
export default Comment;
