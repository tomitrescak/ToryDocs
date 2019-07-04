// import React from 'react';

// import { StaticQuery, graphql } from 'gatsby';

// import { docsGroup } from '@toryjs/ui';
// import { catalogue, catalogueEditor } from '@toryjs/components-vanilla';

// export const DocsGroup = docsGroup({
//   catalogue,
//   editorCatalogue: catalogueEditor,
//   url: 'http://localhost:9001/api',
//   showTopMenu: process.env.NODE_ENV === 'development',
//   hideViews: ['pages', process.env.NODE_ENV == 'production' ? 'all' : '']
// });

// export const Docs = props => {
//   if (process.env.NODE_ENV !== 'production') {
//     return (
//       <StaticQuery
//         query={graphql`
//           query InputJsonQuery {
//             allVanillaJson {
//               edges {
//                 node {
//                   childRawVanillaJson {
//                     form
//                     schema
//                     id
//                     uid
//                   }
//                 }
//               }
//             }
//           }
//         `}
//         render={data => {
//           const edges = data[Object.keys(data)[0]].edges;
//           const project = edges.find(e => e.node[Object.keys(e.node)[0]].uid === props.id);

//           if (project) {
//             console.log(project.node.childRawVanillaJson);

//             return <DocsGroup {...props} project={project.node.childRawVanillaJson} />;
//           }
//           return <div>Not found: {props.id}</div>;
//         }}
//       />
//     );
//   }
//   return <DocsGroup {...props} group={props.group} />;
// };

// // export const Query = () => (
// //   <StaticQuery
// //     query={graphql`
// //       query InputJsonQuery {
// //         allVanillaJson {
// //           edges {
// //             node {
// //               childRawVanillaJson {
// //                 form
// //                 schema
// //                 id
// //                 uid
// //               }
// //             }
// //           }
// //         }
// //       }
// //     `}
// //     render={data => (
// //       <>
// //         <pre>{JSON.stringify(data[Object.keys(data)[0]].edges, null, 2)}</pre>
// //       </>
// //     )}
// //   />
// // );

// // export const Docs = props => {
// //   const pageData = JSON.parse(
// //     fs.readFileSync(`../../forms/${props.id}.json`, { encoding: 'utf-8' })
// //   );
// //   console.log(pageData);
// //   return <DocsGroup {...props} />;
// // };

// function renderProps(props) {
//   return (
//     <table className="ui striped celled table">
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Type</th>
//           <th>B.</th>
//           <th>Documentation</th>
//         </tr>
//       </thead>
//       <tbody>
//         {Object.keys(props).map((key, index) => {
//           const prop = props[key];
//           return (
//             <tr key={index}>
//               <td>{prop.control.props.label || prop.control.props.text}</td>
//               <td>
//                 {prop.schema.type}
//                 {prop.control.props.options && prop.control.props.options.length && (
//                   <>
//                     <hr />
//                     <ul>
//                       {prop.control.props.options.map((v, i) => (
//                         <li>{v && v.text}</li>
//                       ))}
//                     </ul>
//                   </>
//                 )}
//               </td>
//               <td>{prop.control.bound ? '✓' : '⨯'}</td>
//               <td>{prop.control.documentation}</td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// }

// export const Props = props => {
//   const component = catalogueEditor.components[props.name];
//   if (!component) {
//     return <div>Component does not exist: {props.name}</div>;
//   }

//   return (
//     <>
//       <h4 className="ui header">{component.title} Props</h4>
//       {renderProps(component.props)}

//       {component.childProps && (
//         <>
//           <h4 className="ui header">{component.title} Child Props</h4>
//           {renderProps(component.childProps)}
//         </>
//       )}
//     </>
//   );
// };

// // process.env.NODE_ENV = 'production';

// // const gg = require('../catalogue/default/website.json');
// // debugger;

// // const M = () => (
// //   <>
// //     <Docs id={'default'} project={require('../catalogue/default/website.json')} />
// //     <Docs id={'d2'} project={require('../catalogue/d2/website.json')} />,
// //   </>
// // );
