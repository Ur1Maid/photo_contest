import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  useAddContestMutation,
  useGetCreatedQuery,
} from "../../services/api/contest_api";

const AddContestButton = () => {
  const [open, setOpen] = useState(false);
  const [contestName, setContestName] = useState("");
  const [addContest, { isLoading }] = useAddContestMutation();
  const { refetch: refetchCreatedContests } = useGetCreatedQuery();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddContest = async () => {
    try {
      await addContest(contestName).unwrap();
      await refetchCreatedContests();
      handleClose();
      setContestName("");
    } catch (error) {
      console.error("Failed to add contest", error);
    }
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Добавить конкурс
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить новый конкурс</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Название конкурса"
            type="text"
            fullWidth
            variant="outlined"
            value={contestName}
            onChange={(e) => setContestName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Закрыть
          </Button>
          <Button
            onClick={handleAddContest}
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? "Добавляется..." : "Добавить"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddContestButton;
