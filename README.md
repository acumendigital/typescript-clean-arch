# Saturn Node.js architecture 🪐

This is the example repository from the blog post ['Saturn node.js project architecture'](https://softwareontheroad.com/ideal-nodejs-project-structure?utm_source=github&utm_medium=readme)

Please read the blog post in order to have a good understanding of the server architecture.

Also, I added lots of comments to the code that are not in the blog post, because they explain the implementation and the reason behind the choices of libraries and some personal opinions and some bad jokes.

The API by itself doesn't do anything fancy, it's just a user CRUD with authentication capabilities.
Maybe we can transform this into something useful, a more advanced example, just open an issue and let's discuss the future of the repo.

## Development

We use `node` version `14.9.0`

```
nvm install 14.9.0
```

```
nvm use 14.9.0
```

The first time, you will need to run

```
npm install
```

Then just start the server with

```
npm run start
```

It uses nodemon for live reloading :peace-fingers:

## Online one-click setup

You can use Gitpod for the one click online setup. With a single click it will launch a workspace and automatically:

- clone the `saturn-nodejs` repo.
- install the dependencies.
- run `cp .env.example .env`.
- run `npm run dev`.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)

# API Validation

By using [validatorjs](github.com/mikeerickson/validatorjs), the req.body schema becomes cleary defined at route level, so even frontend devs can read what an API endpoint expects without needing to write documentation that can get outdated quickly.

```js
export function validateLogin(req, res, next) {
  const validationRule = {
    email: "required|string|email",
    password: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      sendError(res, err);
    } else {
      next();
    }
  });
}
```

```js
route.post("/sign_in", validateLogin, controller.signIn);
```

**Example error**

```json
{
  "code": 412,
  "status": "failed",
  "error": true,
  "message": "The password field is required."
}
```

[Read more about validatorjs here](github.com/mikeerickson/validatorjs)

# Roadmap

- [x] API Validation layer (Validatorjs)
- [ ] Unit tests examples
- [ ] [Cluster mode](https://softwareontheroad.com/nodejs-scalability-issues?utm_source=github&utm_medium=readme)
- [x] The logging _'layer'_
- [ ] Add agenda dashboard
- [x] Continuous integration with CircleCI 😍
- [ ] Deploys script and docs for AWS Elastic Beanstalk and Heroku
- [ ] Instructions on typescript debugging with VSCode

## API Documentation

To simplify documenting your API, we have included [Optic](https://useoptic.com). To use it, you will need to [install the CLI tool](https://useoptic.com/document/#add-an-optic-specification-to-your-api-project), and then you can use `api exec "npm start"` to start capturing your endpoints as you create them. Once you want to review and add them to your API specification run: `api status -- review`.
