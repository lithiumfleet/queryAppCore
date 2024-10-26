import { Notice, Question } from "./DBTypes"
import { QuestionID } from "../../QuestionTypes"
import { ToBridgeBindable } from "../../Bridge"
import { Answer } from "../../QuestionTypes"

@ToBridgeBindable
export class QuestionDB {
  private questionDS: Map<QuestionID, Question> = new Map()
  private noticeDS: Map<QuestionID, Notice> = new Map()

  // DEBUG: for test usage
  constructor() {
    function DCQ(content: string, trueCase: QuestionID, falseCase: QuestionID) {
      return {
        content,
        jumpTable: new Map([
          [Answer.True, trueCase],
          [Answer.False, falseCase],
        ]),
      } as Question
    }
    function NOQ(content: string, nextQid: QuestionID) {
      return {
        content,
        jumpTable: new Map([[Answer.NoteOnly, nextQid]]),
      } as Question
    }
    this.questionDS.set("BEG_A", DCQ("这是A问卷封面", "A1", "A1"))
    this.questionDS.set("A1", DCQ("A1:选是跳转到A2, 选否跳转到A5", "A2", "A5"))
    this.questionDS.set("A2", NOQ("A2:这是备注区, 只用填备注即可", "A3"))
    this.questionDS.set("A3", DCQ("A3:选是跳转到A4, 选否跳转到A4", "A4", "A4"))
    this.questionDS.set("A4", DCQ("A4:选是跳转到A6, 选否跳转到A5", "A6", "A7"))
    this.questionDS.set("A5", DCQ("A5:选是跳转到A7, 选否跳转到A6", "A7", "A6"))
    this.questionDS.set("A6", DCQ("A6:选是跳转到A7, 选否跳转到A7", "A7", "A7"))
    this.questionDS.set("A7", DCQ("A7:你有鱼鱼蒸", "END_A", "END_A"))
    this.questionDS.set("END_A", DCQ("A问卷结束", "END_A", "END_A"))

    this.noticeDS.set("A2", "这里应该是A2到A4")
    this.noticeDS.set("A3", "这里应该是A2到A4")
    this.noticeDS.set("A4", "这里应该是A2到A4")
    this.noticeDS.set("A7", "你完了, 重开吧")

    this.questionDS.set("BEG_B", DCQ("这是B问卷封面", "B1", "B1"))
    this.questionDS.set("B1", DCQ("选啥都直接结束", "END_B", "END_B"))
    this.questionDS.set("END_B", DCQ("你重开了", "END_B", "END_B"))
  }

  getQuestion(qid: QuestionID) {
    return this.questionDS.get(qid)
  }

  getNotice(qid: QuestionID) {
    return this.noticeDS.get(qid)
  }

  getQuestionAndNotice(qid: QuestionID) {
    const currentQuestion = this.getQuestion(qid)
    if (!currentQuestion) {
      throw Error(
        `[QuestionDB] Current Question "${qid}" can not be found in QuestionDB`,
      )
    }
    const currentNotice = this.getNotice(qid)
    return { currentQuestion, currentNotice }
  }
}
