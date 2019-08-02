# trello-stats

Dashboard for trello statistics

## Project setup
```
npm install
```
After that, you have to go to [Trello Developer API Keys][https://trello.com/app-key/] to retrieve your api key. After that, on the project root, you must create a file called **.env.local** where you have to place you api key:
```
VUE_APP_TRELLO_KEY=YOUR_KEY_HERE
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
If you want to deploy to Github Pages, you have to create the file **.env.production.local** where you have to write:
```
VUE_APP_TRELLO_PATH=/REPOSITORY_NAME/
```

In order to deploy for branch `gh-page` the task `deploy` exists
in the `package.json`.
```
npm run deploy
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
