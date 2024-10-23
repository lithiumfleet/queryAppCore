import { Answer, QuestionID } from "../../../QuestionTypes"

export type HistoryNode = {
  time: number
  qid: QuestionID
  answer: Answer
  note: string | undefined
}
