# Overview

When following a tutorial, it is easy to miss information that the writer assumes you already know, get lost in a sea of tabs when looking things up, and to lose context. Tutorial Wiki is an attempt to solve those problems by enabling modular use of tutorials by embedding them directly into other pages, rather than just hyperlinking.

The front end uses React, Redux, Next, and TinyMCE. It relies on a back end service in the tutorial-service repo, which uses Node, Express, PostgreSQL, and Docker.

https://www.youtube.com/watch?v=lJgLlJ4gj80&ab_channel=MirandaEvans

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