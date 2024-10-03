import { Box, Container, Grid, Typography } from "@mui/material";
import {
  useGetAvailableContestsQuery,
  useGetCreatedQuery,
  useGetParticipatedQuery,
} from "../services/api/contest_api.ts";
import ContestsList from "../comonents/ContestsList/ContestsList.tsx";
import AddContestButton from "../comonents/AddContestButton/AddContestButton.tsx";
import AvailableContests from "../comonents/ContestsList/AvailableContests.tsx";

const MainPage = () => {
  const {
    data: participatedContests,
    error: participatedError,
    isLoading: isLoadingParticipated,
  } = useGetParticipatedQuery();

  const {
    data: createdContests,
    error: createdError,
    isLoading: isLoadingCreated,
  } = useGetCreatedQuery();

  const {
    data: availableContests,
    error: availableError,
    isLoading: isLoadingAvailable,
  } = useGetAvailableContestsQuery();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Конкурсы фотографий
      </Typography>

      <Grid container spacing={4}>
        {/* Список созданных контестов */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
              Мои конкурсы
            </Typography>
            <ContestsList
              contests={createdContests}
              error={createdError as any}
              isContestLoading={isLoadingCreated}
              title=""
            />
          </Box>
        </Grid>

        {/* Список контестов, в которых участвуешь */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
              Доступные для участия конкурсы
            </Typography>
            <AvailableContests
              contests={availableContests}
              error={availableError as any}
              isContestLoading={isLoadingAvailable}
              title=""
            />
          </Box>
        </Grid>

        {/* Список доступных конкурсов */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
              Все доступные конкурсы
            </Typography>
            <ContestsList
              contests={participatedContests}
              error={participatedError as any}
              isContestLoading={isLoadingParticipated}
              title=""
            />
          </Box>
        </Grid>
      </Grid>

      {/* Кнопка для добавления нового контеста */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <AddContestButton />
      </Box>
    </Container>
  );
};

export default MainPage;
