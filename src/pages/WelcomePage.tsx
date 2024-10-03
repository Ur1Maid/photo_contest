import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

const WelcomePage: FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "80px" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Добро пожаловать в Photo Contest
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Выберите способ авторизации
        </Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/login")}
          sx={{ mx: 1, width: "200px" }}
        >
          Вход
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate("/register")}
          sx={{ mx: 1, width: "200px" }}
        >
          Регистрация
        </Button>
      </Box>
    </Container>
  );
};

export default WelcomePage;
