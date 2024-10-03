import { FC } from "react";
import { Contest } from "../../types/Contest.ts";
import { Button, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Импортируем функцию навигации

interface ContestListItemProps {
  contest: Contest;
  onJoinContest?: (contestId: number) => void;
  canJoin: boolean; // Проп для проверки возможности вступления
}

const ContestListItem: FC<ContestListItemProps> = ({
  contest,
  onJoinContest,
  canJoin,
}) => {
  const navigate = useNavigate(); // Создаем функцию для навигации

  const handleClick = () => {
    if (!canJoin) {
      navigate(`/main/contest/${contest.id}`); // Переход на страницу контеста
    }
  };

  return (
    <ListItem button={!canJoin} onClick={handleClick}>
      {" "}
      {/* Условие для клика */}
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
