// import React from 'react';

// const DocumentList = ({ documents, onDelete }) => {
//   return (
//     <div>
//       <h2>Document List</h2>
//       <ul>
//         {documents.map(doc => (
//           <li key={doc.document_id}>
//             {doc.title}
//             <button onClick={() => onDelete(doc.document_id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DocumentList;
// import React from 'react';

// const DocumentList = ({ documents, onDelete }) => {
//   return (
//     <div>
//       <h2>Document List</h2>
//       <ul>
//         {documents.map((doc) => (
//           <li key={doc.document_id}>
//             {/* Make the title a clickable link that opens the document in a new tab */}
//             <a href={doc.file_path} target="_blank" rel="noopener noreferrer">
//               {doc.title}
//             </a>
//             <button onClick={() => onDelete(doc.document_id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DocumentList;


// import React from 'react';
// import './DocumentList.css'; // Import the stylesheet

// const DocumentList = ({ documents, onDelete }) => {
//   return (
//     <div>
//       <h2>Document List</h2>
//       <ul className="document-list">
//         {documents.map(doc => (
//           <li key={doc.document_id} className="document-item">
//             <span className="document-title">{doc.title}</span>
//             <button className="delete-button" onClick={() => onDelete(doc.document_id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DocumentList;

import React from 'react';
import './DocumentList.css'; // Import the stylesheet

const DocumentList = ({ documents, onDelete }) => {
  return (
    <div>
      <h2>Document List</h2>
      <ul className="document-list">
        {documents.map((doc) => (
          <li key={doc.document_id} className="document-item">
            {/* Make the title a clickable link that opens the document in a new tab */}
            <a href={doc.file_path} target="_blank" rel="noopener noreferrer" className="document-title">
              {doc.title}
            </a>
            <button className="delete-button" onClick={() => onDelete(doc.document_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
