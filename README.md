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

## Testing

Start development server, and then run:
```bash
npm cypress open
```

## TODO:
- Test file drag and drop.
- Disable editing a tutorial from a page that does not correspond to the tutorial or its top level parent.
- Enable creation of an editable tutorial copy.
- Disable embedding a tutorial that would create a loop.
- Add responsive design.
- Make sections collapsible.
- Add preveiw in edit and create.
- Redirect to finished page on save.
- Add a button to copy a section id for embedding.
- Remove text ids and other unnecessary fields when sending to server.
- \(Possibly create new text sections where appropriate if one is not present, but this shouldn't be an issue in normal usage.\)
- Create error pop up.