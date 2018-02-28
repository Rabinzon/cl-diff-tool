# cl-diff-tool
Compares two configuration files and shows a difference.

[![Build Status](https://travis-ci.org/Rabinzon/cl-diff-tool.svg?branch=master)](https://travis-ci.org/Rabinzon/cl-diff-tool)
### Usige

```sh
$ npm i -g cl-diff-tool
$ gendiff [options] <firstConfig> <secondConfig>
```
### Options
```
-h, --help           output usage information
-V, --version        output the version number
-f, --format [json|plain]  output format
```

### Example
```sh
$ cat data1.json

{
	"name":"John",
	"age":30,
	"cars":[ "Ford", "BMW", "Fiat" ]
}
```

```sh
$ cat data2.json

{
	"name":"John",
	"age":50,
	"cars": ["Tesla"],
	"children": {
		"name": "Den",
		"age": 20,
		"cars": "BMW"
	}
}
```

```sh
$ gendiff data1.json data2.json
{
    name: John
  + age: 50
  - age: 30
    cars: {
      + 0: Tesla
      - 0: Ford
      - 1: BMW
      - 2: Fiat
    }
  + children: {
        name: Den
        age: 20
        cars: BMW
    }
}
```
