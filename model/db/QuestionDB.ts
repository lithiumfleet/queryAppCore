import { Notice, Question } from "./DBTypes"
import { QuestionID } from "../../QuestionTypes"
import { ToBridgeBindable } from "../../Bridge"

@ToBridgeBindable
export class QuestionDB {
  private questionDS: Map<QuestionID, Question> = new Map()
  private noticeDS: Map<QuestionID, Notice> = new Map()

  // constructor(
  //   questionDS: Map<QuestionID, Question>,
  //   noticeDS: Map<QuestionID, Notice>,
  // ) {
  //   this.questionDS = questionDS
  //   this.noticeDS = noticeDS
  // }

  getQuestion(qid: QuestionID) {
    return this.questionDS.get(qid)
  }

  getNotice(qid: QuestionID) {
    return this.noticeDS.get(qid)
  }
}
