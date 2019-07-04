---
title: 'Providers'
metaTitle: 'How to add and use custom providers in tory.js'
---

## Installation

You can use context to share the package functionality in your app within your components.
To include the provider please add it to the `context.providers` object.
For example, the `@toryjs/components-react-alert` package adds a `alert` function to the context:

```typescript
import { FormComponentProps } from '@toryjs/form';
import { Provider, AlertProviderProps, useAlert } from 'react-alert';

import { createComponents, Context, DynamicComponent } from '@toryjs/ui';

// dynamic component passes only these props onto the "Provider" component
const controlProps = ['position', 'timeout', 'offset', 'transition'];

export const AlertProvider: React.FC<FormComponentProps<AlertProviderProps>> = props => {
  const ctx = React.useContext(Context);

  // here we insert the provider to the context
  ctx.providers.alert = useAlert();

  // we use the dynamic component to make the provider selectable
  return (
    <DynamicComponent
      {...props}
      control={Provider}
      controlProps={controlProps}
      template={AlertTemplate}
    >
      {createComponents(props)}
    </DynamicComponent>
  );
};
```

Also, for the purposes of editor, make sure to mark the component as provider as this makes the
provider selectable also with a mouse in the editor.

```javascript
export const AlertProviderEditor: EditorComponent = {
  provider: true,
  ...
}
```

## Handlers

When the provider is inserted in the context, you can simply use it in the handler:

```typescript
const handler: Handler = ({ context }) => {
  context.providers.alert.show('Hello Planet');
};
```
