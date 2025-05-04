import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useState } from "react";

const rows = [
  { name: "Alice", email: "alice@email.com", role: "Admin" },
  { name: "Bob", email: "bob@email.com", role: "User" },
  // ... more data
];

export default function UsersTable() {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  return (
    <Paper sx={{ mb: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {["Name", "Email", "Role"].map((headCell) => (
                <TableCell key={headCell}>
                  <TableSortLabel active>{headCell}</TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPageOptions={[5]}
      />
    </Paper>
  );
}
