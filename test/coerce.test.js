import Ajv from "ajv"
import * as vdf from "../lib/index.cjs"

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
const modify = json_in => [json_in, validate(json_in)]
const result = vdf.parse(string, {coercer: modify})

console.log(result[0])
console.log(result[1])
