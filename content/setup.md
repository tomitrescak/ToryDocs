---
title: 'Setup'
metaTitle: 'GraphQL Architecture | GraphQL React Apollo Tutorial'
metaDescription: 'Learn about the architecture of GraphQL, GraphQL over HTTP, the client server model with an example of http request'
---

## Quick Start

The best way to start is with our [starter package](https://github.com/toryjs/toryjs/tree/master/examples/starter), which uses the popular Create React App starter and implements all the necessary functionality to start with tory.js, optimised for code splitting. To change to the editor, please **click on the Edit button** in the bottom right corner.

To run this example simply start:

```bash
yarn toryserver
yarn start
```

## Manual Installation

Tory.js can work as a standalone app for designing your forms or applications, or it can be integrated in your existing app, providing application admins the possibility to change the application structure on the fly.

First, we need to install necessary packages, installing the `ui` package and an initial set of components from `@toryjs/components-vanilla`. Then, we install the `@toryjs/editor` package, which provides the visual editor for toryjs.

```bash
yarn add @toryjs/ui
yarn add @toryjs/components-vanilla
yarn add @toryjs/editor
```

Moreover, we will need a functionality that will save the changes that we perform. Currently, we support a standalone server in `@toryjs/server` or a `express` plugin `@toryjs/express-api` which implements the necessary routes for data handling. If you just want to play around, we also support a `LocalStorage` functionality which saves the data in your local storage, which we use in our [Playground](/playground).

### Standalone Server

To install the standalone server just run following:

```bash
yarn add @toryjs/express
```

You can configure several options, such as where your forms will be stored by specifying a `.tory` file in your project root with following options:

```ts
type Config = {
  // port on which you run the server
  port: number;
  // directory where you save your data files
  dir: string;
  // how many backup files you want to keep
  history: number;
  // what is the url of your api
  api: string;
  // how do you want to store your forms
  // flat: all files are saved in the same directory
  // not flat: each file is saved in its own directory
  flat: boolean;
};
```

### Express

If you want to incorporate the toryjs data handling functionality in your existing express instance, you need to do following:

```bash
yarn add @toryjs/express-api
```

Then, you need to register the necessary routes:

```ts
import { registerRoutes, config } from '@toryjs/express-api';
import bodyParser from 'body-parser';

const app = express();

...
app.use(bodyParser.json()); // we need to use json body parser
registerRoutes(app);
```

### Quick Start - Step By Step

The main file of this project contains the `EditableToryForm`, which lazily loads the necessary components:

```ts
import React from 'react';

import { ToryEditableForm } from '@toryjs/editor';

const Editor = React.lazy(() => import('./editor'));
const Form = React.lazy(() => import('./form'));

export const App: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading Form ...</div>}>
      <ToryEditableForm Editor={Editor} Form={Form} canEdit={true} />
    </React.Suspense>
  );
};
```

### Form View

Implementation of the form view is very simple. The most important bit here is to define your catalogues and the form retrieval strategy. In the development mode we will be using a Storage server, while in the production mode we will include the form definition in the bundle. Please adjust this if you want to include the form modifications in your app, for example allowing admins to use the form modification even online.

```ts
import * as React from 'react';
import { ToryForm } from '@toryjs/ui';
import { componentCatalogue } from './config/component_catalogue';
import { handlers } from './config/handlers';
import { storage } from './config/storage';

const Editor: React.FC = props => (
  <ToryForm
    catalogue={componentCatalogue}
    project={process.env.NODE_ENV === 'production' ? require('./forms/default.json') : undefined}
    storage={process.env.NODE_ENV === 'development' ? storage : undefined}
    handlers={handlers}
  />
);

export default Editor;
```

### Form Editor

Form editor is even simpler, providing the configuration parameters, handlers, catalogues ...

```ts
import * as React from 'react';
import { ToryEditor, themes } from '@toryjs/editor';
import { componentCatalogue } from './config/component_catalogue';
import { editorCatalogue } from './config/editor_catalogue';
import { handlers } from './config/handlers';
import { storage } from './config/storage';

const Editor: React.FC = props => (
  <ToryEditor
    componentCatalogue={componentCatalogue}
    editorCatalogue={editorCatalogue}
    storage={storage}
    handlers={handlers}
    theme={themes.dark}
  />
);

export default Editor;
```

### Configuration files

```ts
// storage.ts
import { ServerStorage } from '@toryjs/ui';

export const storage = new ServerStorage(
  process.env.NODE_ENV !== 'development' ? '/api' : 'http://localhost:4100/api',
  'default',
  ''
);

// catalogue.ts

// this is a component catalogue, you need to do similar for editor catalogue
import { catalogue as vanillaCatalogue } from '@toryjs/components-vanilla';
import { catalogue as semanticCatalogue } from '@toryjs/components-semantic-ui';

import { merge } from '@toryjs/ui';

export const componentCatalogue = merge(vanillaCatalogue, semanticCatalogue);

// handlers.ts

import { Handler } from '@toryjs/form';
export const sayHello: Handler = () => {
  alert('Hello!');
};
```
