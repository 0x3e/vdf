import {strict as assert} from "node:assert"
import {describe, it} from "node:test"

const eq = assert.equal
const dEq = assert.deepStrictEqual
const pDSEq = assert.partialDeepStrictEqual
const ok = assert.ok

export {assert, dEq, describe, eq, it, ok, pDSEq}
