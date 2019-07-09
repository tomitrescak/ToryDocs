import React from 'react';

import { createDocs, renderResult } from './common';
import { graphql, StaticQuery } from 'gatsby';

import { merge } from '@toryjs/ui';
import { catalogue as vc, catalogueEditor as vce } from '@toryjs/components-vanilla';
import { catalogue as svc, catalogueEditor as svce } from '@toryjs/components-react-router';

export const catalogue = merge(vc, svc);
export const catalogueEditor = merge(vce, svce);

const handlers = {};

export const { DocsGroup, Props: ReactRouterProps } = createDocs(catalogue, catalogueEditor, []);

export const ReactRouterDocs = props => {
  if (process.env.NODE_ENV === 'production') {
    return (
      <StaticQuery
        query={graphql`
          query ReactRouterQuery {
            allReactrouterJson {
              edges {
                node {
                  childRawReactrouterJson {
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
  return <DocsGroup {...props} group="reactrouter" handlers={handlers} />;
};
