import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getUsers, updateUserRole } from "../Slices/adminSlice";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

type Users = {
    id: string;
  email: string;
  name: string;
  roles: string[]
};

const UserSettings = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleRoleUpdate = (userId: string, newRoles: string | string[]) => {
    const rolesArray = Array.isArray(newRoles) ? newRoles : [newRoles];
    dispatch(updateUserRole({ userId, newRoles: rolesArray }));
};


  users.map((el) => (console.log(el.id)))

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Typography variant="h4">User Settings</Typography>
      <TextField
        label="Search by name or email"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Email</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user: Users) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      value={user.roles}
                        onChange={(e) =>
                            handleRoleUpdate(user.id, e.target.value as string)
                        }
                      label="Role"
                      multiple 
                    >
                      <MenuItem value="USER">User</MenuItem>
                      <MenuItem value="ADMIN">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserSettings;
