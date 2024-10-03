import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { Photo } from "../../types/Photo.ts";
import PhotoCard from "../PhotoCard/PhotoCard.tsx";

interface PhotosListProps {
  photos: Photo[] | undefined;
  error: any;
  isLoading: boolean;
}

const PhotosList: FC<PhotosListProps> = ({ photos, error, isLoading }) => {
  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Typography color="error" align="center">
        Error loading photos: {(error as any).message}
      </Typography>
    );

  return (
    <Grid container spacing={3}>
      {photos?.map((photo) => (
        <Grid item xs={12} sm={6} md={4} key={photo.id}>
          <PhotoCard photo={photo} /> {/* Используем компонент PhotoCard */}
        </Grid>
      ))}
    </Grid>
  );
};

export default PhotosList;
