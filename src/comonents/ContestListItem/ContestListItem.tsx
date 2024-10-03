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
    <ListItem
      onClick={handleClick}
      disableGutters // Убираем отступы по краям, чтобы button выглядел лучше
      secondaryAction={
        canJoin && onJoinContest ? (
          <Button
            variant="text"
            color="primary"
            onClick={(e) => {
              e.stopPropagation(); // Останавливаем всплытие события
              onJoinContest(contest.id);
            }}
          >
            Join
          </Button>
        ) : null
      }
    >
      <ListItemText primary={contest.name} />
    </ListItem>
  );
};

export default ContestListItem;
