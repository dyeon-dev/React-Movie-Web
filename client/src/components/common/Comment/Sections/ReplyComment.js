import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

export default function ReplyComment(props) {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false)

  useEffect(() => {
    let commentNumber = 0; // 처음에 답글은 한개도 없음
    props.commentLists.forEach((comment) => {
      // 부모 댓글 id와 답글 id가 같으면 해당 답글이 되고 그 개수를 세기
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
}, [props.commentLists, props.parentCommentId]);

const renderReplyComment = (parentCommentId) => {
    return props.commentLists.map((comment, index) => {
      if (comment.responseTo === parentCommentId) {
        return (
          <div key={index} style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              refreshFunction={props.refreshFunction}
              movieId={props.movieId}
              comment={comment}
            />
            <ReplyComment
              refreshFunction={props.refreshFunction}
              commentLists={props.commentLists}
              parentCommentId={comment._id}
              movieId={props.movieId}
            />
          </div>
        );
      }
      return null;
    });
  };

  const onHandleChange = () => {
    setOpenReplyComments(!openReplyComments)
  }
  return (
    <div>
        {/* 답글이 있는 경우만 렌더링 */}
        {childCommentNumber > 0 && (
            <p style={{ fontSize: "14px", marginLeft:20, color: "gray" }} onClick={onHandleChange}>
            View {childCommentNumber} more comment(s)
            </p>
      )}

      {/* openReplyComments에 따라 답글 컴포넌트 렌더링을 해줌 */}  
      {/* 부모에서 받아온 댓글id를 답글 컴포넌트에 넘겨줘서 부모 댓글에 답글로 남겨질 수 있도록 함 */}
      {openReplyComments && 
        renderReplyComment(props.parentCommentId)
      }
    </div>
  );
}
