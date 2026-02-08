import React from 'react';
import './styles.scss'

export type ColumnConfig<T> = {
  header: string;
  render: (rowData: T) => React.ReactNode;
};


type TableProps<T> = {
  data: T[];
  columns: ColumnConfig<T>[];
};

export const Table = <T, >({data, columns}: TableProps<T>) => {
  return (
    <table className="table">
      <thead>
      <tr>
        {columns.map((col, index) => (
          <th key={index}>{col.header}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((col, colIndex) => (
            <td key={colIndex}>{col.render(row)}</td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  );
};
