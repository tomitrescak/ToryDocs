---
title: 'Adding Components'
metaTitle: 'Learn how to add new components to Tory.js'
---

## Adding Components

It is fairly simple to add new components. In the heart of it stands the `DynamicComponent` which does most of the heavy lifting for visual representation of the component both in form and in editor. The most important props are `control`, specifying which component will be rendered and `controlProps` which specifies the selection of props passed onto rendered components. This is an example of the `Image` component implementation.

```ts
export type ImageProps = {
  text?: string;
  src?: string;
  imageWidth?: string;
  imageHeight?: string;
};

const imageProps = ['alt', 'src'];

export const Image: React.FC<FormComponentProps<ImageProps>> = props => {
  const context = React.useContext(Context);
  return (
    <DynamicControl
      {...props}
      controlProps={imageProps}
      control="img"
      style={{
        width: getValue(props, context, 'imageWidth'),
        height: getValue(props, context, 'imageHeight')
      }}
    />
  );
};
```

## Adding Editor Components

Each component needs to define its editor counterpart. The editor component defines how the component will be rendered in the editor, alongside the description of all its props. We provide a simple API to render these props in the editor. For example, to create a bound component, you will use a `boundProp`. See the following example of the `ImageEditor` component and please note the use of `observer` functionality from `mobx-react` allowing the component to dynamically re-render when you modify the component parameters.

Props need to define both the controls that are used to modify them as well as schema to validate them. See the many examples in our package and do not be afraid to ask.

```ts
export const ImageEditor: EditorComponent = {
  // component to render
  Component: observer(ImageEditorComponent),
  // title in the component view
  title: 'Image',
  // name of the control
  control: 'Image',
  // which icon will be used (full list of icons is available here: https://react.semantic-ui.com/elements/icon/)
  icon: 'image outline',
  // possibly you can use images inctead of icons
  thumbnails: {
    dark: null,
    light: null
  }
  // list of props
  props: propGroup('Image', {
    alt: boundProp({
      props: { label: 'Alternative Text' }
    }),
    src: boundProp(),
    imageWidth: boundProp(),
    imageHeight: boundProp()
  })
};
```

## Adding Form Elements

If you are adding your own form elements, we provide a simple API available in the `@toryjs/components-vanilla` to add new form elements. Pelase check out their use, for example in the `@toryjs/components-semantic-ui` package:

- createInputComponent
- createTextAreaComponent
- createCheckboxComponent
- createRadioComponent
- createDropdownComponent
