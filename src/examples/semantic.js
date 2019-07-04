import React from 'react';

import { createDocs, renderResult } from './common';
import { graphql, StaticQuery } from 'gatsby';

import { merge } from '@toryjs/ui';
import { catalogue as vc, catalogueEditor as vce } from '@toryjs/components-vanilla';
import { catalogue as svc, catalogueEditor as svce } from '@toryjs/components-semantic-ui';

export const catalogue = merge(vc, svc);
export const catalogueEditor = merge(vce, svce);

const handlers = {
  asyncLoadOptions: () => {
    return new Promise(accept => {
      setTimeout(() => {
        accept([{ text: 'Bacteria', value: 'bacteria' }, { text: 'Virus', value: 'virus' }]);
      }, 1000);
    });
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

export const { DocsGroup, Props: SemanticProps } = createDocs(catalogue, catalogueEditor);

export const SemanticDocs = props => {
  if (process.env.NODE_ENV === 'production') {
    return (
      <StaticQuery
        query={graphql`
          query InputSemanticQuery {
            allSemanticJson {
              edges {
                node {
                  childRawSemanticJson {
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
  return <DocsGroup {...props} group="semantic" handlers={handlers} />;
};
