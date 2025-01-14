import React from 'react';

const ScrollableTable = ({ data }) => {
  // Extract table headers from the keys of the first object
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                style={{
                  position: 'sticky',
                  top: 0,
                  backgroundColor: '#f1f1f1',
                  textAlign: 'left',
                  padding: '8px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                {header.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    padding: '8px',
                    borderBottom: '1px solid #ddd',
                  }}
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrollableTable;
// Example usage
// const sampleData = [
//   { name: 'John Doe', age: 28, occupation: 'Developer' },
//   { name: 'Jane Smith', age: 34, occupation: 'Designer' },
//   { name: 'Sam Wilson', age: 23, occupation: 'Writer' },
// ];

// export default function App() {
//   return (
//     <div>
//       <h1>Scrollable Table Example</h1>
//       <ScrollableTable data={sampleData} />
//     </div>
//   );
// }
