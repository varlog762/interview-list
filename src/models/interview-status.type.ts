import { InterviewStatus } from 'src/enums';

export type InterviewStatusType =
  | InterviewStatus.OFFER
  | InterviewStatus.REJECT
  | InterviewStatus.SCHEDULED
  | InterviewStatus.PENDING
  | InterviewStatus.CANCELED;
