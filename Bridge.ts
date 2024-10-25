interface Bridge {
  call(registedName: string, ...args: unknown[]): unknown
}

export interface BridgeBindable {
  _bridge: ConcreteBridge | undefined
}

export class ConcreteBridge implements Bridge {
  public classJumpTable: Map<string, object> = new Map()

  register(className: string, cls: BridgeBindable) {
    cls._bridge = this
    this.classJumpTable.set(className, cls)
  }

  call(callPath: string, ...args: unknown[]): unknown {
    const splitted = callPath.split(".")
    if (splitted.length !== 2) {
      throw Error(
        `[Bridge] Can not split ${callPath} into two parts. A correct path looks like "MyClass.MyMethod"`,
      )
    }

    const registedClassName = splitted[0]
    const method = splitted[1]
    const registedClass = this.classJumpTable.get(registedClassName)

    if (registedClass) {
      if (typeof (registedClass as object)[method] === "function") {
        return (registedClass as object)[method](...args)
      } else {
        throw Error(
          `[Bridge] Method ${method} does not exist on ${registedClassName}`,
        )
      }
    } else {
      throw Error(
        `[Bridge] Can not found ${registedClassName} in  classJumpTable`,
      )
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function ToBridgeBindable<T extends new (...args: any[]) => object>(
  constructor: T,
) {
  return class extends constructor {
    _bridge: ConcreteBridge | undefined = undefined
    get bridge(): ConcreteBridge {
      if (this._bridge) {
        return this._bridge
      } else {
        throw Error(
          `[ToBridgeBindable] No bridge has been bind to this class: ${constructor.name}`,
        )
      }
    }
  }
}
