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
    function Q(content: string, trueCase: QuestionID, falseCase: QuestionID) {
      return {
        content,
        jumpTable: new Map([
          [Answer.True, trueCase],
          [Answer.False, falseCase],
        ]),
      } as Question
    }
    this.questionDS.set("BEG_A", Q("这是A问卷封面", "A1", "A1"))
    this.questionDS.set("A1", Q("A1:选是跳转到A2, 选否跳转到A5", "A2", "A5"))
    this.questionDS.set("A2", Q("A2:选是跳转到A3, 选否跳转到A3", "A3", "A3"))
    this.questionDS.set("A3", Q("A3:选是跳转到A4, 选否跳转到A4", "A4", "A4"))
    this.questionDS.set("A4", Q("A4:选是跳转到A6, 选否跳转到A5", "A6", "A7"))
    this.questionDS.set("A5", Q("A5:选是跳转到A7, 选否跳转到A6", "A7", "A6"))
    this.questionDS.set("A6", Q("A6:选是跳转到A7, 选否跳转到A7", "A7", "A7"))
    this.questionDS.set("A7", Q("A7:你有鱼鱼蒸", "END", "END"))
    this.questionDS.set("END", Q("A问卷结束", "END", "END"))

    this.noticeDS.set("A2", "这里应该是A2到A4")
    this.noticeDS.set("A3", "这里应该是A2到A4")
    this.noticeDS.set("A4", "这里应该是A2到A4")
    this.noticeDS.set("A7", "你完了, 重开吧")
  }

  getQuestion(qid: QuestionID) {
    return this.questionDS.get(qid)
  }

  getNotice(qid: QuestionID) {
    return this.noticeDS.get(qid)
  }
}
