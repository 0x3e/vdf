import fs from "node:fs"
import path from "node:path"
import * as vdf from "../lib/index.mjs"
import {describe, eq, it, pDSEq} from "../test/test.mjs"

const fix_dir = "fixtures"
const dir_names = [
  "node_steam_vdf",
  "cbartondock_vdf",
  "little_better",
  "string_only",
]
const options = {
  node_steam_vdf: {},
  little_better: {parser: "little_better"},
  cbartondock_vdf: {parser: "cbartondock_vdf"},
  string_only: {parser: "string_only"},
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
