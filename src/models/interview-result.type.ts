import { InterviewStatus } from 'src/enums';

export type InterviewResultType =
  | InterviewStatus.OFFER
  | InterviewStatus.REJECT
  | InterviewStatus.SCHEDULED
  | InterviewStatus.PENDING
  | InterviewStatus.CANCELED;
