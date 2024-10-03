import { CircularProgress, List, Typography } from "@mui/material";
import { FC } from "react";
import { ContestsListProps } from "../../types/ContestsListProps.ts";
import ContestListItem from "../ContestListItem/ContestListItem.tsx";

const ContestsList: FC<ContestsListProps> = ({
  contests,
  error,
  isContestLoading,
  title,
  onJoinContest,
}) => {
  if (isContestLoading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">
        Error loading contests: {(error as any).message}
      </Typography>
    );

  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      <List>
        {contests?.map((contest) => (
          <ContestListItem
            key={contest.id}
            contest={contest}
            onJoinContest={onJoinContest}
            canJoin={!!onJoinContest}
          />
        ))}
      </List>
    </div>
  );
};

export default ContestsList;
