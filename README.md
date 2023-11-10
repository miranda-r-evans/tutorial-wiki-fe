This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODO:
- Add testing.
- Disable editing a tutorial from a page that does not correspond to the tutorial or its top level parent.
- Enable creation of an editable tutorial copy.
- Disable embedding a tutorial that would create a loop.
- Add responsive design.
- Make sections collapsible.
- Add preveiw in edit and create.
- Redirect to finished page on save.
- Add a button to copy a section id for embedding.
- Generate fake ids for fetched text sections and remove ids from new text sections when sending to server.
- \(Possibly create new text sections where appropriate if one is not present, but this shouldn't be an issue in normal usage.\)
- Create error pop up.