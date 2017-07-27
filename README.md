# Video streaming
## Project initialization
* `$ npm init -y`

Typescript setup:
* `$ npm install typescript --save-dev`
* `$ npm install @types/node --save-dev`
* `$ node ./node_modules/typescript/lib/tsc --init`

Live compilation:
* `$npm install ts-node --save-dev`
* `$npm install nodemon --save-dev`
* Edit ./tsconfig.json
```json
{
  "compilerOptions": {
    ...
    "typeRoots": ["node_modules/@types"]
  }
}
```
* Add scripts to ./package.json
```jso
"scripts": {
  "start": "npm run build:live",
  "build:live": "nodemon --exec ./node_modules/.bin/ts-node -- ./index.ts"
},
```

Usage: `$ npm start`

Source: https://basarat.gitbooks.io/typescript/content/docs/quick/nodejs.html

Express & typescript: http://brianflove.com/2016/11/08/typescript-2-express-node/
