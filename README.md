
# L'atelier back-end

This project contains a single microservice allowing a client (the front-end) to be able to request the service 

## Installation

For run the project on local env, docker is necessary 

RUN
```bash
  yarn 
  yarn run project:debug
```

## Tech Stack

**Server:** Node, Docker, Express, Typescript, Mongo


## API Reference

#### Get all cats

```https
  GET /cats
```

#### Get next cats duel

```https
  GET /cats/duel
```

#### Post cats duel

```https
  POST /cats/duel
```

| body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `winnerId`      | `string` | **Required**. Mongo cat id |
| `loserId`      | `string` | **Required**.  Mongo cat id |



# L'atelier back-end

Ce projet contient un seul microservice permettant à un client (le front-end) de pouvoir requêter le service 

## Deployment

To deploy this project run

```bash
  npm run deploy
```

