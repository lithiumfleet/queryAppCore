import { Answer, QuestionID } from "../../QuestionTypes"

export type Notice = string

export type Question = {
  content: string
  jumpTable: JumpTable
}

export type JumpTable = Map<Answer, QuestionID>
