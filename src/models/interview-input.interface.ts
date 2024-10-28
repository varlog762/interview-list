import { InterviewResultType, InterviewStageInterface } from 'src/models';

export interface InterviewInputInterface {
  id: string;
  companyName: string;
  vacancyLink: string;
  hrName: string;
  telegramUsername?: string;
  whatsAppUsername?: string;
  hrPhoneNumber?: string;
  minSalary?: number;
  maxSalary?: number;
  stages?: InterviewStageInterface[];
  result?: InterviewResultType;
  createdAt: Date;
}
