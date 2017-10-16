install:
	npm i

start:
	npm run babel-node -- src/bin/gendiff

lint:
	npm run lint

publish:
	npm publish
