import { Button, Container, TextField, Typography } from "@mui/material";
import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/api/auth_api.ts";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password }).unwrap();

      navigate("/main");
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
      {error && (
        <Typography color="error" style={{ marginTop: "10px" }}>
          Failed to login. Please try again.
        </Typography>
      )}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/")}
        style={{ marginTop: "20px" }}
        fullWidth
      >
        Back to Welcome
      </Button>
    </Container>
  );
};

export default LoginForm;
