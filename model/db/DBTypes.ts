import { Answer, QuestionID } from "../../QuestionTypes"

export type Notice = string

export type JumpTable = Map<Answer, QuestionID>

export type Question = {
  content: string
  jumpTable: JumpTable
}
