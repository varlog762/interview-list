import { InterviewStatusEnum } from 'src/enums';

export type InterviewStatusType =
  | InterviewStatusEnum.OFFER
  | InterviewStatusEnum.REJECT
  | InterviewStatusEnum.SCHEDULED
  | InterviewStatusEnum.PENDING
  | InterviewStatusEnum.CANCELED;
