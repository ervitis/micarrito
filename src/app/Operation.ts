import { EventEmitter } from 'events'

export class Operation extends EventEmitter {
  public outputs

  static setOutputs (outputs) {
    Object.defineProperty(this.prototype, 'outputs', {
      value: createOutputs(outputs)
    })
  }

  on (output, handler) {
    if (this.outputs[output]) {
      return this.addListener(output, handler)
    }

    throw new Error(`Invalid output ${output} in operation ${this.constructor.name}`)
  }

  execute () {
    throw new Error(`Missing ${this.constructor.name}::execute() implementation`)
  }
}

const createOutputs = (outputsArray) => {
  return outputsArray.reduce((obj, output) => {
    obj[output] = output
    return obj
  }, Object.create(null))
}
