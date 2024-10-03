import { Contest } from "./Contest.ts";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface ContestsListProps {
  contests: Contest[] | undefined;
  error: FetchBaseQueryError | null | undefined;
  isContestLoading: boolean;
  title: string;
  onJoinContest?: (contestId: number) => void;
  canJoin?: boolean;
}
