import { FC } from "react";
import { Typography } from "@mui/material";
import { Comment } from "../../types/Comment.ts"; // Импортируйте свой тип комментария

interface CommentListProps {
  comments: Comment[];
}

const CommentList: FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Typography key={comment.id} variant="body2" color="textSecondary">
          {comment.text}
        </Typography>
      ))}
    </div>
  );
};

export default CommentList;
