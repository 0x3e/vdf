import * as vdf from "../lib/index.mjs"
import {describe, eq, it, pDSEq} from "../test/test.mjs"

const string=`
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
		/*
		  accountData:{
				AccountName: String,
				PersonaName: String,
				RememberPassword: Boolean,
				WantsOfflineMode: Boolean,
				SkipOfflineModeWarning: Boolean,
				AllowAutoLogin: Boolean,
				MostRecent: Boolean,
				Timestamp: Number
			},
			*/

let coercer_type = {
user:{
	'<ID>': {
			AccountName: String,
			PersonaName: String,
			RememberPassword: Boolean,
			WantsOfflineMode: Boolean,
			SkipOfflineModeWarning: Boolean,
			AllowAutoLogin: Boolean,
			MostRecent: Boolean,
			Timestamp: Number
		}
	}
}

const result = vdf.parse(string, {parser: 'coerce', type: coercer_type})

console.log(result)
