// TODO:Add factory to all!
import { ConcreteBridge, BridgeBindable } from "./Bridge"
import { Controller } from "./Controller"
import { History } from "./history/History"
import { QuestionDB } from "./model/db/QuestionDB"
import { QuestionnaireModel } from "./model/QuestionnariaModel"

const bridge = new ConcreteBridge()

const history = new History()
const questionDB = new QuestionDB()
const questionnaireModel = new QuestionnaireModel()

export const controller = new Controller()

bridge.register(history as unknown as BridgeBindable)
bridge.register(questionDB as unknown as BridgeBindable)
bridge.register(questionnaireModel as unknown as BridgeBindable)
bridge.register(controller as unknown as BridgeBindable)
