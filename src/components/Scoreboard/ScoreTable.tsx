import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import ScoreTableToolbar from "./ScoreTableToolbar";
import { PlayerStats } from "../../utils/types";
import { stableSort, getComparator } from "./ScoreTableSort";

type Order = "asc" | "desc";

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof PlayerStats
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  id: keyof PlayerStats;
  label: string;
  numeric: boolean;
}
const headCells: HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "Name",
  },
  {
    id: "wins",
    numeric: true,
    label: "Wins",
  },
  {
    id: "losses",
    numeric: true,
    label: "Losses",
  },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler =
    (property: keyof PlayerStats) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ paddingLeft: 2 }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface Props {
  data: PlayerStats[];
}

const ScoreTable: React.FC<Props> = ({ data }) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof PlayerStats>("wins");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof PlayerStats
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = React.useMemo(
    () => stableSort(data, getComparator(order, orderBy)),
    [order, orderBy]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <ScoreTableToolbar />
      <TableContainer>
        <Table sx={{ minWidth: 150 }} aria-labelledby="table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {visibleRows.map((row: PlayerStats, index: number) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell
                    component="th"
                    align={"left"}
                    id={labelId}
                    scope="row"
                    padding="none"
                    sx={{ paddingLeft: 2, width: "40px" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "40px" }}>
                    {row.wins}
                  </TableCell>
                  <TableCell align="left" sx={{ width: "140px" }}>
                    {row.losses}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ScoreTable;
