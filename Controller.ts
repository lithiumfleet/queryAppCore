import { Action, QuestionID } from "./QuestionTypes"
import { ToBridgeBindable } from "./Bridge"
import {
  RawUserInput,
  UserInputFormatter,
} from "./formatters/UserInputFormatter"
import { Poster } from "./Poster"
import { BrowserWindow } from "electron"

@ToBridgeBindable
export class Controller {
  private formatter = new UserInputFormatter()
  private poster: Poster

  constructor(poster: Poster) {
    this.poster = poster
  }

  setMainWindow(window: BrowserWindow) {
    // 需要使用这个初始化Poster
    this.poster.setMainWindow(window)
  }

  processUserInputs(rawUserInput: RawUserInput) {
    // 处理用户当前输入
    const userInput = this.formatter.format(rawUserInput)
    let nextQid: QuestionID | undefined = undefined
    switch (userInput.action) {
      case Action.Undo:
        this.undoLastCommit()
        break

      case Action.GetQuestionnarieA:
        // @ts-ignore: bridge will init later
        this.bridge.call("QuestionnaireModel.setQuestionnarie", "A")
        break

      case Action.GetQuestionnarieB:
        // @ts-ignore: bridge will init later
        this.bridge.call("QuestionnaireModel.setQuestionnarie", "B")
        break

      case Action.Answer:
        if (!userInput.data) {
          throw Error("[Model] userInput.data is undefined.")
        }
        // Save to history
        // @ts-ignore: bridge will init later
        this.bridge.call(
          "QuestionnaireModel.processCommit",
          userInput.timeStamp,
          userInput.data.answer,
          userInput.data.note,
        )
        // Get next question id
        // @ts-ignore: bridge will init later
        nextQid = this.bridge.call(
          "QuestionnaireModel.getNextQid",
          userInput.data.answer,
        )
        // Set next question id
        // @ts-ignore: bridge will init later
        this.bridge.call("QuestionnaireModel.setCurrentQid", nextQid)
        break

      default:
        throw Error(`[Controller] Invaid action: ${userInput.action}`)
        break
    }
    this.syncRender()
  }

  undoLastCommit() {
    // 撤销上次输入, 回到上一个问题, 同步Model
    // @ts-ignore: bridge will init later
    const qid: QuestionID | undefined = this.bridge.call("History.undo")
    if (qid) {
      // @ts-ignore: bridge will init later
      this.bridge.call("QuestionnaireModel.setCurrentQid", qid)
      console.info(`[Controller] Undo last time, back to ${qid}`)
    } else {
      console.info(`[Controller] Nothing to undo`)
    }
  }

  private syncRender() {
    console.info(
      "[Controller] Generating FontInfo from backend, syncing with renderer",
    )
    return this.poster.syncRender()
  }
}
