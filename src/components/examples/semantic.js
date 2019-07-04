import React from 'react';

import { graphql } from 'gatsby';
import { catalogue, catalogueEditor } from '@toryjs/components-semantic-ui';

import { createComponent } from './common';

const handlers = {};

// export const Docs = createComponent({
//   catalogue,
//   catalogueEditor,
//   group: 'semantic',
//   handlers,
//   query: graphql`
//     query InputSemanticQuery {
//       allSemanticJson {
//         edges {
//           node {
//             childRawSemanticJson {
//               form
//               schema
//               id
//               uid
//             }
//           }
//         }
//       }
//     }
//   `
// });

export const Docs = () => <div>Docs</div>;
