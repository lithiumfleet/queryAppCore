import { Answer, Note } from "./QuestionTypes"

export class Controller {
  processUserInputs(answer: Answer, note: Note | undefined = undefined) {
    // 处理用户当前输入
  }
  undoLastCommit() {
    // 撤销上次输入, 回到上一个问题
  }
  pushToRender() {
    // 发送到渲染进程
  }
}
