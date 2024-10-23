import { QuestionID } from "../../QuestionTypes"
import { Answer, Note } from "../../QuestionTypes"

export class QuestionnaireModel {
  private currentQid: QuestionID

  setCurrentQid(qid: QuestionID) {
    // 设置currentQis到下一个Qid
    console.info(`[Model] set qid to ${qid}`)
    this.currentQid = qid
  }
  getNextQid(answer: Answer) {
    // 解析下一个QuestionID
  }
  processCommit(answer: Answer, note: Note | undefined = undefined) {
    // 加入历史, 设置并解析
  }
  getCurrentQuestionAndNotice() {
    // 给Poster调用
  }
}
