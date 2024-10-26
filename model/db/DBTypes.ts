import { Answer, QuestionID } from "../../QuestionTypes"

export type Notice = string

export type JumpTable = Map<Answer, QuestionID>

export type Question = {
  content: string
  jumpTable: JumpTable
}

export enum QuestionnarieCtlToken {
  BEGA = "BEG_A",
  ENDA = "END_A",
  BEGB = "BEG_B",
  ENDB = "END_B",
}
