import { Answer, Note } from "./QuestionTypes"
import { ToBridgeBindable } from "./Bridge"

@ToBridgeBindable
export class Controller {
  processUserInputs(answer: Answer, note: Note | undefined = undefined) {
    // TODO:处理用户当前输入
  }
  undoLastCommit() {
    // TODO:撤销上次输入, 回到上一个问题
  }
  pushToRender() {
    // TODO:发送到渲染进程
  }
}
