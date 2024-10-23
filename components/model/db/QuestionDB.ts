import { Notice, Question } from "./DBTypes"
import { QuestionID } from "../../../QuestionTypes"

export class QuestionDB {
  private questionDS: Map<QuestionID, Question>
  private noticeDS: Map<QuestionID, Notice | null>

  constructor(
    questionDS: Map<QuestionID, Question>,
    noticeDS: Map<QuestionID, Notice | null>,
  ) {
    this.questionDS = questionDS
    this.noticeDS = noticeDS
  }

  getQuestion(qid: QuestionID) {
    return this.questionDS.get(qid)
  }

  getNotice(qid: QuestionID) {
    return this.noticeDS.get(qid)
  }
}
