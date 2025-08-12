import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { User } from '../types/adminTypes';
import React from 'react'; // Import React

interface UserManagementSectionProps {
  users: User[];
}

export const UserManagementSection = ({ users }: UserManagementSectionProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Enrolled Courses</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell className="font-medium">{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>
            <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
              {user.role}
            </Badge>
          </TableCell>
          <TableCell>{user.courses}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);