**VDF** is a module to convert [Valve's KeyValue format](https://developer.valvesoftware.com/wiki/KeyValues) to JSON and back using Typescript.

> Heavily inspired by [simple-vdf](https://github.com/rossengeorgiev/vdf-parser)
>
> (`< v2.0.0` can be used as a drop-in replacement)
>
> [Differences](#differences-from-simple-vdf)

## Usage:

```javascript
import * as VDF from '0x3e-vdf';

// or

import {
    parse,
    stringify,
} from '0x3e-vdf';
```

## Documentation:

#### `VDF.parse(text: string)`
> Parse a VDF string into a JSON object

```javascript
const string = `
"string"          "string"
"false"           "false"
"true"            "true"
"number"          "1234"
"float"           "12.34"
"null"            "null"
"undefined"       "undefined"
"nested"
{
    "string"      "string"
    "deep"
    {
        "string"  "string"
    }
}
`;

const object = VDF.parse(string);

// or

const object = parse(string);

> {
    string:     'string',
    false:      false,
    true:       true,
    number:     1234,
    float:      12.34,
    null:       null,
    undefined:  undefined,
    nested: {
        string: 'string',
        deep: {
            string: 'string',
        },
    },
};
```

#### `VDF.stringify(object: object)`
> Parse a JSON object into a VDF string

```javascript
const object = {
    string:     'string',
    false:      false,
    true:       true,
    number:     1234,
    float:      12.34,
    null:       null,
    undefined:  undefined,
    nested: {
        string: 'string',
        deep: {
            string: 'string',
        },
    },
};

const string = VDF.stringify(object);

// or

const string = stringify(object);

> `
"string"          "string"
"false"           "false"
"true"            "true"
"number"          "1234"
"float"           "12.34"
"null"            "null"
"undefined"       "undefined"
"nested"
{
    "string"      "string"
    "deep"
    {
        "string"  "string"
    }
}
`;
```

## Differences from [simple-vdf](https://github.com/rossengeorgiev/vdf-parser)


## Contributors

- Silas Rech aka. **[lenovouser](mailto:silas.rech@protonmail.com)**

## Contributing:

Interested in contributing to **VDF**? Contributions are welcome, and are accepted via pull requests. Please [review these guidelines](contributing.md) before submitting any pull requests.

### Help:

**Installing dependencies:**

```
npm install
```

**Compile:**

```
npm run compile
```

**Test:**

```
npm run test
```

**Generate Docs:**

```
npm run docs
```

## Tests:


## License:
Code licensed under [MIT](license), documentation under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
