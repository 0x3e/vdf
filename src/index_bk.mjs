import * as vdf from "../lib/node-steam-vdf.mjs"

export function parse(text, options = {}) {
  let parsed_text = {}
  parsed_text = vdf.parse(text)

  if (typeof options.parser === "function")
    return do_parser_function(parsed_text, options)
  else return node_steam_vdf(parsed_text)
}

function do_parser_function(parsed_text, options) {
  const fun = options.parser
  if (options.mangle) {
    recurse_mangle(parsed_text, fun)
    return parsed_text
  }

  return fun(parsed_text)
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
