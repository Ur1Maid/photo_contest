import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetAllPhotosQuery } from "../services/api/photo_api.ts";
import AddPhotoButton from "../comonents/AddPhotoButton/AddPhotoButton.tsx";
import PhotosList from "../comonents/PhotosList/PhotosList.tsx";

const ContestPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: photos, error, isLoading } = useGetAllPhotosQuery(Number(id));

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Заголовок страницы */}
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Фото контестов
      </Typography>

      {/* Кнопка добавления фото */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <AddPhotoButton contestId={Number(id)} />
      </Box>

      {/* Список фотографий */}
      <PhotosList photos={photos} error={error} isLoading={isLoading} />
    </Container>
  );
};

export default ContestPage;
