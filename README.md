# Checkers app

This is a mini checkers app(4x4), where two players can play this game online. A user can sign up/log in, they are redirected to lobby where they can create a new checkers game and wait until second player will join it, or join the game from the list(if there is any).

## Deployed Application

This app is deployed on heroku, feel free to check it [here](https://checkers-not-chess.herokuapp.com/).

You can log in with the `username: janedoe` and `password: password`, open new private browser window(to have two windows open), sign up with new account, and mimic the two player interaction in the lobby and game pages.

## Project tech stack

1. **Client side stack:**

- JavaScript | HTML | CSS
- [React](https://github.com/facebook/create-react-app)
- [react-router-dom v6](https://reactrouter.com/docs/en/v6/getting-started/overview)
- Authentication => [jwt-decode](https://www.npmjs.com/package/jwt-decode)

2. **[Server side](https://github.com/vzaboraite/boolean-uk-final-solo-project-server) stack:**

- Node.js | [Express](https://expressjs.com/en/starter/installing.html)
- Authentication => [bcrypt](https://www.npmjs.com/package/bcrypt) + [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

3. **Database stack:**

- [PostgreSQL](https://www.postgresql.org/docs/) | [Prisma ORM](https://www.prisma.io/docs/concepts/components/prisma-client)
  | [ElephantSQL](https://www.elephantsql.com/)
