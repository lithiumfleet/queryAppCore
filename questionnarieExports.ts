import { BrowserWindow } from "electron"
import { ConcreteBridge, type BridgeBindable } from "./Bridge"
import { Poster } from "./Poster"
import { Controller } from "./Controller"
import { History } from "./history/History"
import { QuestionDB } from "./model/db/QuestionDB"
import { QuestionnaireModel } from "./model/QuestionnarieModel"

const bridge = new ConcreteBridge()
const history = new History()
const questionDB = new QuestionDB()
const questionnaireModel = new QuestionnaireModel()
const poster = new Poster()
const controller = new Controller(poster)
bridge.register("History", history as unknown as BridgeBindable)
bridge.register("QuestionDB", questionDB as unknown as BridgeBindable)
bridge.register(
  "QuestionnaireModel",
  questionnaireModel as unknown as BridgeBindable,
)
bridge.register("Poster", poster as unknown as BridgeBindable)
bridge.register("Controller", controller as unknown as BridgeBindable)

export function getController() {
  return controller
}

export {
  BrowserWindow,
  ConcreteBridge,
  type BridgeBindable,
  Poster,
  Controller,
  History,
  QuestionDB,
  QuestionnaireModel,
}
