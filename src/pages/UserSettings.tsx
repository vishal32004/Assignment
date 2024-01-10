import React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { getUsers, updateUserRole } from '../Slices/adminSlice';
import Swal from 'sweetalert2';
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
  Container,
} from '@mui/material';
type Users = {
  id: string;
  email: string;
  name: string;
  roles: string[];
};

type RootState = {
  users: {
    users: Users[];
  };
};
const UserSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const loggedInUserRole = 'ADMIN';
  const handleRoleUpdate = (userId: string, newRoles: string | string[]) => {
    const rolesArray = Array.isArray(newRoles) ? newRoles : [newRoles];
    const userToUpdate = users.find((user) => user.id === userId);

    if (
      userToUpdate &&
      userToUpdate.roles.includes('ADMIN') &&
      loggedInUserRole === 'ADMIN'
    ) {
      Swal.fire({
        title: 'Error',
        text: 'You cannot change the role of another admin.',
        icon: 'error',
      });
      return;
    }
    Swal.fire({
      title: 'Confirm Role Change',
      text: 'Are you sure you want to change this user\'s role?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateUserRole({ userId, newRoles: rolesArray }));
        Swal.fire('Role Changed!', '', 'success');
      }
    });
  };

  const filteredUsers: Users[] = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ fontFamily: '\'Poppins\', sans-serif' }}>
      <Typography
        variant="h4"
        sx={{
          fontSize: '1.5rem',
          padding: '20px 10px',
          textAlign: 'center',
          fontFamily: '\'Poppins\', sans-serif',
        }}
      >
        User Settings
      </Typography>
      <Container maxWidth="sm">
        <TextField
          label="Search by name or email"
          variant="outlined"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          margin="normal"
          fullWidth
          size="small"
          sx={{ marginBottom: '16px', fontFamily: '\'Poppins\', sans-serif' }}
        />
      </Container>
      <Container sx={{ maxWidth: 'none' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#3B3486' }}>
                <TableCell
                  sx={{ color: '#fff', fontFamily: '\'Poppins\', sans-serif' }}
                >
                  User Email
                </TableCell>
                <TableCell
                  sx={{ color: '#fff', fontFamily: '\'Poppins\', sans-serif' }}
                >
                  User Name
                </TableCell>
                <TableCell
                  sx={{ color: '#fff', fontFamily: '\'Poppins\', sans-serif' }}
                >
                  Role
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user: Users) => (
                <TableRow key={user.id}>
                  <TableCell sx={{ fontFamily: '\'Poppins\', sans-serif' }}>
                    {user.email}
                  </TableCell>
                  <TableCell sx={{ fontFamily: '\'Poppins\', sans-serif' }}>
                    {user.name}
                  </TableCell>
                  <TableCell>
                    <FormControl variant="outlined">
                      <Select
                        value={user.roles}
                        onChange={(e) =>
                          handleRoleUpdate(user.id, e.target.value)
                        }
                        label="Role"
                        multiple
                        sx={{ fontFamily: '\'Poppins\', sans-serif' }}
                      >
                        <MenuItem
                          value="USER"
                          sx={{ fontFamily: '\'Poppins\', sans-serif' }}
                        >
                          User
                        </MenuItem>
                        <MenuItem
                          value="ADMIN"
                          sx={{ fontFamily: '\'Poppins\', sans-serif' }}
                        >
                          Admin
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Container>
  );
};

export default UserSettings;
