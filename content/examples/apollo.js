import React from 'react';

import { createDocs, renderResult } from './common';
import { graphql, StaticQuery } from 'gatsby';

import { merge } from '@toryjs/ui';
import { catalogue as ac, catalogueEditor as ace } from '@toryjs/components-apollo';
import { catalogue as vc, catalogueEditor as vce } from '@toryjs/components-vanilla';
import { catalogue as alertC, catalogueEditor as alertCe } from '@toryjs/components-react-alert';
import { catalogue as sc, catalogueEditor as sce } from '@toryjs/components-semantic-ui';

export const catalogue = merge(ac, vc, alertC, sc);
export const catalogueEditor = merge(ace, vce, alertCe, sce);

const handlers = {};

export const { DocsGroup, Props: ApolloProps } = createDocs(catalogue, catalogueEditor);

export const ApolloDocs = props => {
  if (process.env.NODE_ENV === 'production') {
    return (
      <StaticQuery
        query={graphql`
          query InputApolloQuery {
            allApolloJson {
              edges {
                node {
                  childRawApolloJson {
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
  return <DocsGroup {...props} group="apollo" handlers={handlers} />;
};
