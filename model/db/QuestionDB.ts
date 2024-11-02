import { QuestionID } from "../../Types"
import { ToBridgeBindable } from "../../Bridge"
import { QuestionDS, NoticeDS, SuperNoticeDS } from "./DSinitializer"

@ToBridgeBindable
export class QuestionDB {
  private questionDS: QuestionDS = new QuestionDS()
  private noticeDS: NoticeDS = new NoticeDS()
  private superNoticeDS: SuperNoticeDS = new SuperNoticeDS()

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
