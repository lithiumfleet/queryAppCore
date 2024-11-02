import { Answer, QuestionID } from "../../Types"

export type HistoryNode = {
  time: number
  qid: QuestionID
  answer: Answer
  note: string | undefined
}
