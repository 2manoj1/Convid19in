import React from 'react';
import MaterialTable from 'material-table';

export default function Orders({columns, data}) {
  return (
    <React.Fragment>
      <MaterialTable
        title="State Wise Details"
        columns={columns}
        data={data}
        options={{
          sorting: true
        }}
      />

    </React.Fragment>
  );
}