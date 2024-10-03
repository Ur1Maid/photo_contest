import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Photo } from "../../types/Photo.ts";

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

  const baseUrl = "http://127.0.0.1:8000/api/";

  return (
    <Grid container spacing={3}>
      {photos?.map((photo) => {
        const imageUrl = `${baseUrl}${photo.url.replace(/\\/g, "/")}`;
        return (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
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
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PhotosList;
