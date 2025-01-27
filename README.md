This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

Add your public key and server id values in serverActions.tsx file.

---

https://github.com/stellar/js-stellar-sdk/issues/1132

The issue was solved by splitting the actions into server (prepare and send) and client (sign)!
