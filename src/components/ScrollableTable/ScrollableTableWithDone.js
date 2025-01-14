import React, { useState } from 'react';

const ScrollableTableWithDone = ({ data }) => {
  // State to track the "done" status for each item
  const [items, setItems] = useState(data);

  // Toggle the "done" status
  const toggleDone = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item
      )
    );
  };

  // Extract table headers
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const trueHeaders = headers.slice(0,2);

  return (
    <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {trueHeaders.map((header, index) => (
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
            <th
                key={2}
                style={{
                  position: 'sticky',
                  top: 0,
                  backgroundColor: '#f1f1f1',
                  textAlign: 'center',
                  padding: '8px',
                  borderBottom: '1px solid #ddd',
                }}
            >
                DONE
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                backgroundColor: row.done ? '#d4edda' : 'white',
                textDecoration: row.done ? 'line-through' : 'none',
              }}
            >
              {trueHeaders.map((header, colIndex) => (
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
              <td
                style={{
                  padding: '8px',
                  borderBottom: '1px solid #ddd',
                  textAlign: 'center',
                }}
              >
                <input
                  type="checkbox"
                  checked={row.done || false}
                  onChange={() => toggleDone(rowIndex)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrollableTableWithDone;

// // Example usage
// const sampleData = [
//   { name: 'John Doe', age: 28, occupation: 'Developer', done: false },
//   { name: 'Jane Smith', age: 34, occupation: 'Designer', done: false },
//   { name: 'Sam Wilson', age: 23, occupation: 'Writer', done: false },
// ];

// export default function App() {
//   return (
//     <div>
//       <h1>Scrollable Table with Mark as Done</h1>
//       <ScrollableTableWithDone data={sampleData} />
//     </div>
//   );
// }
