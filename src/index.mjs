import * as vdf from "../lib/node-steam-vdf.mjs"
import {coercer} from "../lib/ofcoerce.mjs"

export function parse(text, options = {}) {
  let parsed_text = {}
  parsed_text = vdf.parse(text)
  if (options.parser === "cbartondock_vdf")
    return cbartondock_vdf(parsed_text)
  else if (options.parser === "little_better")
    return little_better(parsed_text)
  else if (options.parser === "string_only") return parsed_text
  else if (options.parser === "coerce") return coerce(parsed_text, options)
  else return node_steam_vdf(parsed_text)
}

function coerce(parsed_text, options) {
  const c = coercer( $ => options.type)
	console.log('coercer:',c)
	console.log('parsed_text:',parsed_text)

	return c(parsed_text)
}

function cbartondock_vdf(ob) {
  recurse_mangle(ob, (k, val) => {
    if (val !== "" && !Number.isNaN(+val) && String(+val) === val) val = +val
    else if (val === "true") val = true
    else if (val === "false") val = false
    else if (val === "null") val = null
    else if (val === "undefined") val = undefined

    return {k: k, v: val}
  })

  return ob
}

function node_steam_vdf(ob) {
  recurse_mangle(ob, (k, val) => {
    if (val !== "" && !Number.isNaN(+val)) val = +val
    else if (val === "true") val = true
    else if (val === "false") val = false
    else if (val === "null") val = null
    else if (val === "undefined") val = undefined

    return {k: k, v: val}
  })

  return ob
}

function little_better(ob) {
  recurse_mangle(ob, (k, val) => {
    if (+val === Number.POSITIVE_INFINITY) val = String(val)
    else if (+val === Number.NEGATIVE_INFINITY) val = String(val)
    else if (val !== "" && !Number.isNaN(val) && String(+val) === val)
      val = +val
    else if (val === "true") val = true
    else if (val === "false") val = false
    else if (val === "null") val = null
    else if (val === "undefined") val = undefined

    return {k: k, v: val}
  })

  return ob
}

function recurse_mangle(ob, fn) {
  Object.keys(ob).forEach(k => {
    if (ob[k] !== null && typeof ob[k] === "object") {
      const mangled = fn(k, ob[k])
      recurse_mangle(ob[k], fn)
      ob[mangled.k] = ob[k]
      if (k !== mangled.k) delete ob[k]
    } else {
      const mangled = fn(k, ob[k])
      if (k !== mangled.k) delete ob[k]
      ob[mangled.k] = mangled.v
    }
  })
}

export function stringify(object, options = {}) {
  if (
    Object.hasOwn(options, "something") &&
    typeof options.something === "object"
  ) {
    typeof options
  }
  return vdf.stringify(object)
}
