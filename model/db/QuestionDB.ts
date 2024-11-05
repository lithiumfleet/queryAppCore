import { QuestionID } from "../../Types"
import { ToBridgeBindable } from "../../Bridge"
import { getAllDSinited } from "./initializer/DSFactory"
import { QuestionDS, NoticeDS, SuperNoticeDS } from "./initializer/DS"

@ToBridgeBindable
export class QuestionDB {
  private questionDS: QuestionDS
  private noticeDS: NoticeDS
  private superNoticeDS: SuperNoticeDS

  constructor() {
    const { questionDS, noticeDS, superNoticeDS } = getAllDSinited()
    this.questionDS = questionDS
    this.noticeDS = noticeDS
    this.superNoticeDS = superNoticeDS
  }

  getQuestion(qid: QuestionID) {
    return this.questionDS.get(qid)
  }

  getNotice(qid: QuestionID) {
    return this.noticeDS.get(qid)
  }

  getSuperNotice(qid: QuestionID) {
    return this.superNoticeDS.get(qid)
  }

  getQuestionAndNotice(qid: QuestionID) {
    const currentQuestion = this.getQuestion(qid)
    if (!currentQuestion) {
      throw Error(
        `[QuestionDB] Current Question "${qid}" can not be found in QuestionDB`,
      )
    }
    const currentNotice = this.getNotice(qid)
    const currentSuperNotice = this.getSuperNotice(qid)
    return { currentQuestion, currentNotice, currentSuperNotice }
  }
}
