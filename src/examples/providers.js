import React from 'react';

import { createDocs, renderResult } from './common';
import { graphql, StaticQuery } from 'gatsby';

import { merge } from '@toryjs/ui';
import { catalogue as vc, catalogueEditor as vce } from '@toryjs/components-vanilla';
import { catalogue as alertC, catalogueEditor as alertCe } from '@toryjs/components-react-alert';

export const catalogue = merge(vc, alertC);
export const catalogueEditor = merge(vce, alertCe);

const handlers = {
  info({ context }) {
    context.providers.alert.info('Info');
  },
  error({ context }) {
    context.providers.alert.error('Error');
  },
  success({ context }) {
    context.providers.alert.success('Success');
  }
};

export const { DocsGroup, Props: ProvidersProps } = createDocs(catalogue, catalogueEditor);

export const ProvidersDocs = props => {
  if (process.env.NODE_ENV === 'production') {
    return (
      <StaticQuery
        query={graphql`
          query InputProvidersQuery {
            allProvidersJson {
              edges {
                node {
                  childRawProvidersJson {
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
  return <DocsGroup {...props} group="providers" handlers={handlers} />;
};
