import Ajv from "ajv"
import * as vdf from "../lib/index.mjs"

//import {describe, eq, it, pDSEq} from "../test/test.mjs"

const string = `
"users"
{
        "76561198000992386"
        {

                "AccountName"           "0o777777777777"
                "PersonaName"           "0b10101010101"
                "RememberPassword"              "1"
                "WantsOfflineMode"              "0"
                "SkipOfflineModeWarning"                "0"
                "AllowAutoLogin"                "1"
                "MostRecent"            "1"
                "Timestamp"             "1781253972"
        }
}
`

const json_schema = {
  type: "object",
  required: ["users"],
  properties: {
    users: {
      type: "object",
      patternProperties: {
        "^\\d{17}$": {
          type: "object",
          required: ["AccountName", "PersonaName"],
          properties: {
            AccountName: {
              type: "string",
            },
            PersonaName: {
              type: "string",
            },
            RememberPassword: {
              type: "integer",
              enum: [0, 1],
            },
            WantsOfflineMode: {
              type: "integer",
              enum: [0, 1],
            },
            SkipOfflineModeWarning: {
              type: "integer",
              enum: [0, 1],
            },
            AllowAutoLogin: {
              type: "integer",
              enum: [0, 1],
            },
            MostRecent: {
              type: "integer",
              enum: [0, 1],
            },
            Timestamp: {
              type: "string",
            },
          },
          additionalProperties: true,
        },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
}

const ajv = new Ajv({coerceTypes: true, removeAdditional: true})

const validate = ajv.compile(json_schema)
const json_vdf = vdf.parse(string, {mangle: false})
validate(json_vdf)

console.log(json_vdf)
console.log(validate.errors)
