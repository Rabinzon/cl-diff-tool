install:
	npm i

start:
	npm run babel-node -- src/bin/gendiff

watch-tests:
	npm run test -- --watch

test:
	npm run test

lint:
	npm run lint

publish:
	npm publish
