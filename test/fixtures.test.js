import fs from "node:fs"
import path from "node:path"
import * as vdf from "../lib/index.cjs"
import {describe, eq, it, pDSEq} from "../test/test.mjs"

const fix_dir = "fixtures"
const dir_names = [
  "node_steam_vdf",
  "cbartondock_vdf",
  "little_better",
  "string_only",
]
const options = {
  strings: {parser: strings => strings},
  node_steam_vdf: {},
  little_better: {
    mangle: true,
    parser: (k, v) => {
      if (+v === Number.POSITIVE_INFINITY) v = String(v)
      else if (+v === Number.NEGATIVE_INFINITY) v = String(v)
      else if (v !== "" && !Number.isNaN(v) && String(+v) === v) v = +v
      else if (v === "true") v = true
      else if (v === "false") v = false
      else if (v === "null") v = null
      else if (v === "undefined") v = undefined

      return {k: k, v: v}
    },
  },
  cbartondock_vdf: {
    mangle: true,
    parser: (k, val) => {
      if (val !== "" && !Number.isNaN(+val) && String(+val) === val)
        val = +val
      else if (val === "true") val = true
      else if (val === "false") val = false
      else if (val === "null") val = null
      else if (val === "undefined") val = undefined

      return {k: k, v: val}
    },
  },
}

dir_names.forEach(dir_name => {
  describe(`VDF ${dir_name}`, () => {
    fs.readdirSync(path.join(fix_dir)).forEach(file_name => {
      if (!file_name.match(/\.vdf$/)) return
      //if (!file_name.match(/nest/)) return

      const json_file = path.join(fix_dir, dir_name, `${file_name}.json`)
      if (!fs.existsSync(json_file)) return

      const vdf_file = path.join(fix_dir, file_name)
      const vdf_error_file = path.join(
        fix_dir,
        dir_name,
        `${file_name}.error`,
      )

      let error_string = ""
      if (fs.existsSync(vdf_error_file))
        error_string = fs.readFileSync(vdf_error_file, "utf8")

      const string = fs.readFileSync(vdf_file, "utf8")
      const object = JSON.parse(fs.readFileSync(json_file, "utf8"))

      describe(file_name, () => {
        it(`parse ${dir_name} ${vdf_file}`, () => {
          const result = vdf.parse(string, options[dir_name])
          pDSEq(result, object)
        })
        if (error_string) {
          it(`stringify expects ${vdf_error_file}`, () => {
            const result = vdf.stringify(object)
            eq(result, error_string)
          })
        } else {
          it(`stringify ${json_file}`, () => {
            const result = vdf.stringify(object)
            eq(result, string)
          })
        }
      })
    })
  })
})
