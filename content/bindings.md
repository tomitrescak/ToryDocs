---
title: 'Bindings'
metaTitle: 'What are the bindings and how do they work?'
---

BYou can simply bind the component props to dynamically reflect to your data changes. Currently, we support three binding strategies:

1. Static binding, depicted as a green square <div style="background: green; width: 10px; height: 10px; display: inline-block"></div> next to the property value, simply binds the property to a static value.

1. Dataset binding, depicted as a green square <div style="background: orange; width: 10px; height: 10px; display: inline-block"></div> next to the property value, binds the prop to a dataset value, or a value passed down through DataProps (see examples in the [Apollo](/components/apollo))

1. Handler binding, depicted as a red square <div style="background: red; width: 10px; height: 10px; display: inline-block"></div> next to the property value, binds the prop to a handler result. You need to define the handler and make sure it is imported. The handler has a following header:

   ```ts
   export type HandlerArgs = {
     owner?: DataSet;
     props?: FormComponentProps;
     formElement?: FormElement;
     context?: Context;
     args?: any;
   };

   export type Handler = (args?: HandlerArgs) => any;
   ```
