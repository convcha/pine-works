import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { prisma } from "database";
import { LoaderFunction, useLoaderData } from "remix";

import { db } from "~/utils/db.server";

type LoaderData = {
  users: Array<Pick<prisma.User, "id" | "username" | "name">>;
};

export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    users: await db.user.findMany({
      select: { id: true, username: true, name: true },
    }),
  };
  return data;
};

export default function UsersIndex() {
  const data = useLoaderData<LoaderData>();

  return (
    <Box>
      <h1>Users</h1>
      <TableContainer component={Paper}>
        <Table aria-label="users">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
