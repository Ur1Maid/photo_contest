import { FC } from "react";
import { Contest } from "../../types/Contest.ts";
import { Button, ListItem, ListItemText } from "@mui/material";

interface ContestListItemProps {
  contest: Contest;
  onJoinContest?: (contestId: number) => void;
  canJoin: boolean; // Добавляем проп для проверки возможности вступления
}

const ContestListItem: FC<ContestListItemProps> = ({
  contest,
  onJoinContest,
  canJoin,
}) => {
  return (
    <ListItem>
      <ListItemText primary={contest.name} />
      {canJoin && onJoinContest && (
        <Button
          variant="text"
          color="primary"
          onClick={() => onJoinContest(contest.id)}
        >
          Join
        </Button>
      )}
    </ListItem>
  );
};

export default ContestListItem;
