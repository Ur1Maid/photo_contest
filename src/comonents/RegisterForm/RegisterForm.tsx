import { Button, Container, TextField, Typography } from "@mui/material";
import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../services/api/auth_api.ts";

const RegisterForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const navigate = useNavigate();
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await register({ email, password, nickname }).unwrap();

      navigate("/login");
    } catch (error) {
      console.error("Failed to register", error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
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
        <TextField
          label="Nickname"
          type="text"
          fullWidth
          margin="normal"
          required
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
      {error && (
        <Typography color="error" style={{ marginTop: "10px" }}>
          Failed to register. Please try again.
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

export default RegisterForm;
