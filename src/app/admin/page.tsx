import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

// Mock data
const subscriptions = [
    { id: 'sub1', userName: 'Alice Johnson', courseName: 'React Fundamentals', status: 'pending' },
    { id: 'sub2', userName: 'Bob Williams', courseName: 'Advanced TypeScript', status: 'pending' },
    { id: 'sub3', userName: 'Charlie Brown', courseName: 'Firebase for Web', status: 'approved' },
];

const users = [
    { id: 'user1', name: 'Alice Johnson', email: 'alice@example.com', role: 'user', courses: 1 },
    { id: 'user2', name: 'Bob Williams', email: 'bob@example.com', role: 'user', courses: 1 },
    { id: 'user3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', courses: 2 },
    { id: 'user4', name: 'Admin User', email: 'admin@example.com', role: 'admin', courses: 0 },
];

export default function AdminPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Subscriptions</CardTitle>
                        <CardDescription>Review and approve new course subscription requests.</CardDescription>
                    </CardHeader>
                    <CardContent>
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
                                {subscriptions.filter(s => s.status === 'pending').map(sub => (
                                    <TableRow key={sub.id}>
                                        <TableCell>{sub.userName}</TableCell>
                                        <TableCell>{sub.courseName}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{sub.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="mr-2 text-green-600 hover:text-green-700">
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         {subscriptions.filter(s => s.status === 'pending').length === 0 && (
                            <p className="text-center text-muted-foreground py-4">No pending subscriptions.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>View all registered users on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
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
                                {users.map(user => (
                                     <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>{user.role}</Badge>
                                        </TableCell>
                                        <TableCell>{user.courses}</TableCell>
                                     </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
