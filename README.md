# OxPayment UI

> The UI for OxPayment. It's based on hop protocol frontend: https://github.com/hop-protocol/hop/tree/develop/packages/frontend.

## Getting started

Install dependencies:

```bash
yarn install
```

Lerna link:

```bash
npx lerna link
```

Start app (uses `kovan` network by default):

```bash
yarn run dev
```

Start app using a different network (e.g. `mainnet`, `goerli`, `kovan`)

```bash
REACT_APP_NETWORK=mainnet yarn run dev
```

Visit [https://localhost:3000/](https://localhost:3000/)
