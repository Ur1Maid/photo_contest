import {
  useGetAvailableContestsQuery,
  useGetCreatedQuery,
  useGetParticipatedQuery,
  useJoinContestMutation,
} from "../../services/api/contest_api";
import { FC } from "react";
import { ContestsListProps } from "../../types/ContestsListProps.ts";
import Contests from "./ContestsList.tsx";

const AvailableContests: FC<ContestsListProps> = ({
  contests,
  error,
  isContestLoading,
  title,
}) => {
  const [
    joinContest,
    // { isLoading }
  ] = useJoinContestMutation();
  const { refetch: refetchParticipatedContests } = useGetParticipatedQuery();

  const { refetch: refetchCreatedContests } = useGetCreatedQuery();

  const { refetch: refetchAvailableContests } = useGetAvailableContestsQuery();

  const handleJoinContest = async (contestId: number) => {
    try {
      await joinContest(contestId).unwrap();
      await refetchCreatedContests();
      await refetchAvailableContests();
      await refetchParticipatedContests();
    } catch (error) {
      console.error("Failed to join contest", error);
    }
  };

  return (
    <Contests
      contests={contests}
      title={title}
      onJoinContest={handleJoinContest} // Передаем обработчик
      isContestLoading={isContestLoading}
      error={error} // Укажите ошибку, если она есть
    />
  );
};

export default AvailableContests;
