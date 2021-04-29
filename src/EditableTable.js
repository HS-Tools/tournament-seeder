import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  TableInlineCellEditing,
} from '@devexpress/dx-react-grid-material-ui';

const getRowId = row => row.id;

const FocusableCell = ({ onClick, ...restProps }) => (
  <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
);

const EditableTable = () => {
  const [columns] = useState([
    { name: 'battletag', title: 'Battletag' },
    { name: 'mmr', title: 'MMR' },
    { name: 'points', title: 'Points' },
  ]);
  
  const [rows, setRows] = useState([
    { id: 0, battletag: 'Lii#11987', mmr: 15000, points: 0 }, 
    { id: 1, battletag: 'Lii#11987', mmr: 15000, points: 0 }, 
    { id: 2, battletag: 'Lii#11987', mmr: 15000, points: 0 }, 
    { id: 3, battletag: 'Lii#11987', mmr: 15000, points: 0 }
  ]);
  const [editingCells, setEditingCells] = useState([]);

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0
        ? Math.max(rows[rows.length - 1].id, rows[0].id) + 1
        : 0;
      changedRows = [
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          battletag: 'Placeholder',
          points: 0,
          mmr: 4000,
          ...row,
        })),
        ...rows,
      ];
      setEditingCells([{ rowId: startingAddedId, columnName: columns[0].name }]);
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }

    setRows(changedRows);
  };

  const addEmptyRow = () => commitChanges({ added: [{}] });

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <EditingState
          onCommitChanges={commitChanges}
          editingCells={editingCells}
          onEditingCellsChange={setEditingCells}
          addedRows={[]}
          onAddedRowsChange={addEmptyRow}
        />
        <Table cellComponent={FocusableCell} />
        <TableHeaderRow />
        <TableInlineCellEditing selectTextOnEditStart />
        <TableEditColumn
          showAddCommand
          showDeleteCommand
        />
      </Grid>
    </Paper>
  );
};

export default EditableTable;