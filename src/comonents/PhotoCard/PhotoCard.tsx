import { FC, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { Photo } from "../../types/Photo.ts";
import {
  useAddCommentMutation,
  useGetPhotoCommentsQuery,
  useGetPhotoVotesQuery,
  useVotePhotoMutation,
} from "../../services/api/photo_api.ts";
import CommentList from "../CommentList/CommentList.tsx"; // Импортируем ваш новый компонент для комментариев

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard: FC<PhotoCardProps> = ({ photo }) => {
  const [votePhoto] = useVotePhotoMutation();
  const [addComment, { isLoading: isCommenting }] = useAddCommentMutation();

  // Получение голосов и комментариев
  const {
    data: votesData,
    isLoading: isVotesLoading,
    refetch: refetchVotes,
  } = useGetPhotoVotesQuery(photo.id);
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    refetch: refetchComments,
  } = useGetPhotoCommentsQuery(photo.id);

  const [rating, setRating] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");

  const handleRatingChange = async (newRating: number | null) => {
    if (newRating !== null) {
      try {
        await votePhoto({ photo_id: photo.id, rate: newRating }).unwrap();
        setRating(newRating);
        refetchVotes(); // Обновляем голоса после голосования
      } catch (err) {
        console.error("Error voting for photo:", err);
      }
    }
  };

  const handleAddComment = async () => {
    if (commentText) {
      try {
        await addComment({ photo_id: photo.id, text: commentText }).unwrap();
        setCommentText(""); // Сброс текста комментария после успешного добавления
        refetchComments(); // Обновить данные о комментариях
      } catch (err) {
        console.error("Error adding comment:", err);
      }
    }
  };

  const baseUrl = "http://127.0.0.1:8000/api/";
  const imageUrl = `${baseUrl}${photo.url.replace(/\\/g, "/")}`;

  const calculateAverageRating = (votes: any[]): number => {
    if (votes.length === 0) return 0;
    const total = votes.reduce((acc, vote) => acc + vote.rate, 0);
    return parseFloat((total / votes.length).toFixed(1));
  };

  return (
    <Card>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={photo.title}
        height="200"
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {photo.title}
        </Typography>
        {isVotesLoading ? (
          <CircularProgress size={24} />
        ) : (
          <Typography variant="body2" color="textSecondary">
            Average Rating: {calculateAverageRating(votesData || [])} / 5
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary">
          Likes: {votesData?.length || 0}
        </Typography>
        <Rating
          name={`rating-${photo.id}`}
          value={rating}
          onChange={(e, newValue) => handleRatingChange(newValue)}
          max={5}
        />

        {/* Форма для добавления комментария */}
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          size="small" // Уменьшаем размер текстового поля
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          sx={{ mt: 2, display: "flex", alignItems: "center" }} // Добавляем flex
        />
        <Button
          variant="text"
          color="primary"
          onClick={handleAddComment}
          disabled={isCommenting || !commentText}
          sx={{ ml: 1, height: "100%" }} // Уменьшаем кнопку и делаем её маленькой
        >
          {isCommenting ? "..." : "+"}
        </Button>

        {/* Отображение комментариев */}
        {isCommentsLoading ? (
          <CircularProgress size={24} />
        ) : (
          <CommentList comments={commentsData || []} /> // Используем полученные комментарии
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
