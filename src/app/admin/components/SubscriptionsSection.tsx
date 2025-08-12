import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { Subscription } from '../types/adminTypes';
import React from 'react'; // Import React

interface SubscriptionsSectionProps {
  subscriptions: Subscription[];
}

export const SubscriptionsSection = ({ subscriptions }: SubscriptionsSectionProps) => {
  const pendingSubscriptions = subscriptions.filter(s => s.status === 'pending');

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingSubscriptions.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell>{sub.userName}</TableCell>
              <TableCell>{sub.courseName}</TableCell>
              <TableCell>
                <Badge variant="secondary">{sub.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 text-green-600 hover:text-green-700"
                  // TODO: Implement approve functionality
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:text-red-700"
                  // TODO: Implement reject functionality
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {pendingSubscriptions.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          No pending subscriptions.
        </p>
      )}
    </>
  );
};