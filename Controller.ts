import { Action, Answer, Note, QuestionID } from "./QuestionTypes"
import { ToBridgeBindable } from "./Bridge"
import {
  RawUserInput,
  UserInputFormatter,
} from "./formatters/UserInputFormatter"
import { Poster } from "./Poster"

@ToBridgeBindable
export class Controller {
  private formatter = new UserInputFormatter()
  private poster = new Poster()

  processUserInputs(rawUserInput: RawUserInput) {
    // TODO:处理用户当前输入
    const userInput = this.formatter.format(rawUserInput)
    switch (userInput.action) {
      case Action.Undo:
        this.undoLastCommit()
        break
      case Action.Answer:
        // TODO HERE
        break
      default:
        break
    }
    this.syncRender()
  }

  undoLastCommit() {
    // 撤销上次输入, 回到上一个问题, 同步Model
    // @ts-ignore: bridge will init later
    const qid: QuestionID = this.bridge.call("History.undo")
    // @ts-ignore: bridge will init later
    this.bridge.call("QuestionnaireModel.setCurrentQid", qid)
    console.info(`[Controller] Undo last time, back to ${qid}`)
  }

  syncRender() {
    this.poster.pushToRender()
    console.info("[Controller] Sync with renderer")
  }
}
