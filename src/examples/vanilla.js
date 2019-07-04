import React from 'react';

import { createDocs, renderResult } from './common';
import { graphql, StaticQuery } from 'gatsby';

import { catalogue, catalogueEditor } from '@toryjs/components-vanilla';

const handlers = {
  asyncLoadOptions: () => {
    return new Promise(accept => {
      setTimeout(() => {
        accept([{ text: 'Bacteria', value: 'bacteria' }, { text: 'Virus', value: 'virus' }]);
      }, 1000);
    });
  },
  alert: ({ args }) => {
    alert(args);
  },
  prohibit: ({ args }) => {
    args.e.preventDefault();
    alert('Handler says: Prevented submit');
  },
  notifyClick: () => {
    alert('Clicked');
  },
  loadCities: () => [
    { text: 'Sydney', value: 'syd', country: 'au' },
    { text: 'Melbourne', value: 'mel', country: 'au' },
    { text: 'Bari', value: 'bari', country: 'it' },
    { text: 'Barcelona', value: 'bcn', country: 'es' },
    { text: 'Rozhanovce', value: 'roz', country: 'sk' }
  ]
};

export const { DocsGroup, Props: VanillaProps } = createDocs(catalogue, catalogueEditor);

export const VanillaDocs = props => {
  if (process.env.NODE_ENV === 'production') {
    return (
      <StaticQuery
        query={graphql`
          query InputVanillaQuery {
            allVanillaJson {
              edges {
                node {
                  childRawVanillaJson {
                    form
                    schema
                    id
                    uid
                  }
                }
              }
            }
          }
        `}
        render={renderResult(DocsGroup, props, handlers)}
      />
    );
  }
  return <DocsGroup {...props} group="vanilla" handlers={handlers} />;
};
