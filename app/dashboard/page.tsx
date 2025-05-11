"use client";
import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
} from "@heroui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableColumn,
} from "@heroui/table";
import { Badge } from "@heroui/badge";
import { useSession } from "next-auth/react";
const purchasedCourses = [
    { name: "React Basics", date: "2024-05-01", status: "Active" },
    { name: "TypeScript Mastery", date: "2024-04-15", status: "Completed" },
];

const payments = [
    { id: "INV-001", amount: "$49", date: "2024-05-01", status: "Paid" },
    { id: "INV-002", amount: "$99", date: "2024-04-15", status: "Paid" },
];

function DashboardPage() {
    const { data: session } = useSession();
    console.log("Session data:", session); // Debugging line to check session data
    return (
        <main className="p-8 bg-background min-h-screen">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex flex-col">
                    <Card className="flex flex-col h-full text-center">
                        <CardHeader className="flex flex-col items-center gap-1 pb-2">
                            <h4 className="text-lg font-semibold">Purchased Courses</h4>
                            <p className="text-muted-foreground text-sm">
                                Your recent course enrollments and their status.
                            </p>
                        </CardHeader>
                        <CardBody className="flex-1 flex flex-col justify-center items-center">
                            <Table>
                                <TableHeader>
                                    <TableColumn>Course</TableColumn>
                                    <TableColumn>Date</TableColumn>
                                    <TableColumn>Status</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {purchasedCourses.map((course) => (
                                        <TableRow key={course.name}>
                                            <TableCell>{course.name}</TableCell>
                                            <TableCell>{course.date}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    color={
                                                        course.status === "Active" ? "success" : "secondary"
                                                    }
                                                    variant="faded"
                                                >
                                                    {course.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
                <div className="flex-1 flex flex-col">
                    <Card className="flex flex-col h-full text-center">
                        <CardHeader className="flex flex-col items-center gap-1 pb-2">
                            <h4 className="text-lg font-semibold">Payments</h4>
                            <p className="text-muted-foreground text-sm">
                                Your latest payment history.
                            </p>
                        </CardHeader>
                        <CardBody className="flex-1 flex flex-col justify-center items-center">
                            <Table>
                                <TableHeader>
                                    <TableColumn>Invoice</TableColumn>
                                    <TableColumn>Amount</TableColumn>
                                    <TableColumn>Date</TableColumn>
                                    <TableColumn>Status</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {payments.map((payment) => (
                                        <TableRow key={payment.id}>
                                            <TableCell>{payment.id}</TableCell>
                                            <TableCell>{payment.amount}</TableCell>
                                            <TableCell>{payment.date}</TableCell>
                                            <TableCell>
                                                <Badge color="success" variant="solid">
                                                    {payment.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardBody>
                    </Card>
                </div>
                
            </div>
        </main>
    );
}

export default DashboardPage;
