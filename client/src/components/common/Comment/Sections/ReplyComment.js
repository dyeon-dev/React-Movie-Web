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
    // Check if the comment exists and has the property 'responseTo'
    if (comment && comment.responseTo) {
      return (
        <React.Fragment key={index}>
          {comment.responseTo === parentCommentId && (
            <div style={{ width: '80%', marginLeft: '40px' }}>
              <SingleComment
                refreshFunction={props.refreshFunction}
                refreshRemoveFunction={props.refreshRemoveFunction}
                refreshEditFunction={props.refreshEditFunction}

                movieId={props.movieId}
                comment={comment}
                commentLists={props.commentLists}
              />
              <ReplyComment
                refreshFunction={props.refreshFunction}
                refreshRemoveFunction={props.refreshRemoveFunction}
                refreshEditFunction={props.refreshEditFunction}

                commentLists={props.commentLists}
                parentCommentId={comment._id}
                movieId={props.movieId}
              />
            </div>
          )}
        </React.Fragment>
      );
    } else {
      // Skip rendering if the comment is undefined or doesn't have 'responseTo'
      return null;
    }
  });
};


  const onHandleChange = () => {
    setOpenReplyComments(!openReplyComments)
  }
  return (
    <div>
        {/* 답글이 있는 경우만 렌더링 */}
        {childCommentNumber > 0 && (
            <p style={{ fontSize: "14px", marginLeft:20, color: "#9BA3AF" }} onClick={onHandleChange}>
            댓글 {childCommentNumber}개 더보기
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
