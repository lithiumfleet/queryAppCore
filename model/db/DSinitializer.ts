import { Answer, QuestionID, Question, Notice, SuperNotice } from "../../Types"

function NOQ(content: string, nextQid: QuestionID) {
  return {
    content,
    jumpTable: new Map([[Answer.NoteOnly, nextQid]]),
  } as Question
}
function BCQ(content: string, trueCase: QuestionID, falseCase: QuestionID) {
  return {
    content,
    jumpTable: new Map([
      [Answer.True, trueCase],
      [Answer.False, falseCase],
    ]),
  } as Question
}

export class QuestionDS {
  ds: Map<QuestionID, Question> = new Map()

  constructor() {
    this.ds.set("BEG_A", BCQ("这是A问卷封面", "A1", "A1"))
    this.ds.set("A1", BCQ("A1:选是跳转到A2, 选否跳转到A5", "A2", "A5"))
    this.ds.set("A2", NOQ("A2:这是备注区, 只用填备注即可", "A3"))
    this.ds.set("A3", BCQ("A3:选是跳转到A4, 选否跳转到A4", "A4", "A4"))
    this.ds.set("A4", BCQ("A4:选是跳转到A6, 选否跳转到A5", "A6", "A7"))
    this.ds.set("A5", BCQ("A5:选是跳转到A7, 选否跳转到A6", "A7", "A6"))
    this.ds.set("A6", BCQ("A6:选是跳转到A7, 选否跳转到A7", "A7", "A7"))
    this.ds.set("A7", BCQ("A7:你有鱼鱼蒸", "END_A", "END_A"))
    this.ds.set("END_A", BCQ("A问卷结束", "END_A", "END_A"))

    this.ds.set("BEG_B", BCQ("这是B问卷封面", "B1", "B1"))
    this.ds.set("B1", BCQ("选啥都直接结束", "END_B", "END_B"))
    this.ds.set("END_B", BCQ("你重开了", "END_B", "END_B"))
  }

  get(qid: QuestionID): Question | undefined {
    return this.ds.get(qid)
  }
}

export class NoticeDS {
  ds: Map<QuestionID, Notice> = new Map()

  constructor() {
    this.ds.set("A2", "这里应该是A2到A4")
    this.ds.set("A3", "这里应该是A2到A4")
    this.ds.set("A4", "这里应该是A2到A4")
    this.ds.set("A7", "你完了, 重开吧")
  }

  get(qid: QuestionID): Notice | undefined {
    return this.ds.get(qid)
  }
}

export class SuperNoticeDS {
  ds: Map<QuestionID, SuperNotice> = new Map()

  get(qid: QuestionID): SuperNotice | undefined {
    return this.ds.get(qid)
  }
}
