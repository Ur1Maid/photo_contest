import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FC, useState } from "react";
import {
  useAddPhotoMutation,
  useGetAllPhotosQuery,
} from "../../services/api/photo_api";

interface AddPhotoButtonProps {
  contestId: number;
}

const AddPhotoButton: FC<AddPhotoButtonProps> = ({ contestId }) => {
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [addPhoto, { isLoading }] = useAddPhotoMutation();
  const { refetch: refetchAllContestPhoto } = useGetAllPhotosQuery(contestId);

  const handleAddPhoto = async () => {
    if (photo) {
      const formData = new FormData();
      formData.append("contest_id", contestId.toString());
      formData.append("photo", photo);

      await addPhoto(formData).unwrap();
      await refetchAllContestPhoto();
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPhoto(null);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Photo
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Photo</DialogTitle>
        <DialogContent>
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files?.[0] || null)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddPhoto} color="primary" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPhotoButton;
