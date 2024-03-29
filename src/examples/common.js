import React from 'react';
import { docsGroup } from '@toryjs/editor';

function renderProps(props, ref) {
  return (
    <div ref={ref}>
      <table className="ui striped celled table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>B.</th>
            <th>Documentation</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props).map((key, index) => {
            const prop = props[key];
            return (
              <tr key={index}>
                <td>
                  {prop.control.props.label ||
                    prop.control.props.text ||
                    prop.control.props.editorLabel}
                </td>
                <td>
                  {prop.schema.type}
                  {prop.control.props.options && prop.control.props.options.length && (
                    <>
                      <span className="meta">[enum]</span>
                      <hr />
                      <ul className="propList">
                        {prop.control.props.options.map((v, i) => (
                          <li key={i}>{v && v.text}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </td>
                <td>{prop.control.bound ? '✓' : '⨯'}</td>
                <td dangerouslySetInnerHTML={{ __html: prop.control.documentation }} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export const createDocs = (catalogue, editorCatalogue, hideViews) => ({
  DocsGroup: docsGroup({
    catalogue,
    editorCatalogue,
    url: 'http://localhost:9001/api',
    showTopMenu: process.env.NODE_ENV === 'development',
    hideViews: hideViews || ['pages', process.env.NODE_ENV == 'production' ? 'all' : '']
  }),
  Props: props => {
    const ref = React.useRef();
    const refChild = React.useRef();
    const propButton = React.useRef();
    const childButton = React.useRef();

    React.useEffect(() => {
      if (ref && ref.current && ref.current.getBoundingClientRect().height > 200) {
        ref.current.classList.add('faded');
        propButton.current.style.display = 'block';
      }
      if (refChild && refChild.current && refChild.current.getBoundingClientRect().height > 200) {
        refChild.current.classList.add('faded');
        childButton.current.style.display = 'block';
      }
    });

    const component = editorCatalogue.components[props.name];
    if (!component) {
      return <div>Component does not exist: {props.name}</div>;
    }

    return (
      <>
        <h4 className="ui header">{component.title} Props</h4>
        {renderProps(component.props, ref)}
        <button
          className="ui button"
          ref={propButton}
          style={{ display: 'none' }}
          onClick={() => {
            ref.current.classList.remove('faded');
            propButton.current.style.display = 'none';
          }}
        >
          <i className="icon expand" />
          Expand Props
        </button>

        {component.childProps && (
          <>
            <h4 className="ui header">{component.title} Child Props</h4>
            {renderProps(component.childProps, refChild)}
            <button
              className="ui button"
              ref={childButton}
              style={{ display: 'none' }}
              onClick={() => {
                refChild.current.classList.remove('faded');
                childButton.current.style.display = 'none';
              }}
            >
              <i className="icon expand" />
              Expand Props
            </button>
          </>
        )}
      </>
    );
  }
});

export function renderResult(DocsGroup, props, handlers) {
  return data => {
    const edges = data[Object.keys(data)[0]].edges;
    const project = edges.find(e => e.node[Object.keys(e.node)[0]].uid === props.id);

    if (project) {
      return (
        <DocsGroup
          {...props}
          project={project.node[Object.keys(project.node)[0]]}
          handlers={handlers}
        />
      );
    }
    return <div>Not found: {props.id}</div>;
  };
}

// import React from 'react';

// import { docsGroup } from '@toryjs/ui';

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
//                 {prop.schema.properties && prop.schema.properties.value
//                   ? prop.schema.properties.value.type
//                   : prop.schema.type}
//                 {prop.control.props.options && prop.control.props.options.length && (
//                   <>
//                     <span className="meta">Enum</span>
//                     <hr />
//                     <ul className="propOptions">
//                       {prop.control.props.options.map((v, i) => (
//                         <li key={i}>{v && v.text}</li>
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

// export function createComponent({ catalogue, catalogueEditor, group, handlers, query }) {
//   const DocsGroup = docsGroup({
//     catalogue,
//     catalogueEditor,
//     url: 'http://localhost:9001/api',
//     showTopMenu: process.env.NODE_ENV === 'development',
//     hideViews: ['pages', process.env.NODE_ENV == 'production' ? 'all' : '']
//   });
//   const Docs = props => {
//     if (process.env.NODE_ENV === 'production') {
//       return (
//         <StaticQuery
//           query={query}
//           render={data => {
//             const edges = data[Object.keys(data)[0]].edges;
//             const project = edges.find(e => e.node[Object.keys(e.node)[0]].uid === props.id);

//             if (project) {
//               return (
//                 <DocsGroup
//                   {...props}
//                   project={project.node[Object.keys(project.node)[0]]}
//                   handlers={handlers}
//                 />
//               );
//             }
//             return <div>Not found: {props.id}</div>;
//           }}
//         />
//       );
//     }
//     return <DocsGroup {...props} group={group} handlers={handlers} />;
//   };
//   return Docs;
// }

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
