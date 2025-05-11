"use client";
import { BadgeCheck, Clock } from "lucide-react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";

const paymentHistory = [
    { id: 1, courseName: "React Basics", price: "$49", status: "Paid" },
    { id: 2, courseName: "Advanced TypeScript", price: "$79", status: "Pending" },
    { id: 3, courseName: "Node.js Mastery", price: "$59", status: "Paid" },
];

const statusColors: Record<string, string> = {
    Paid: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
};

const statusIcons: Record<string, React.ReactNode> = {
    Paid: <BadgeCheck className="w-4 h-4 mr-1 text-green-600" />,
    Pending: <Clock className="w-4 h-4 mr-1 text-yellow-600" />,
};

const PaymentsPage = () => {
    return (
        <div className="flex flex-col items-center justify-center m-1 px-0 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 px-4">Payments</h1>
            <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5 w-full ">
                <Table aria-label="Payment history table" className="sm:w-[80vw] min-w-full divide-y divide-gray-200 ">
                    <TableHeader>
                        <TableColumn className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</TableColumn>
                        <TableColumn className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</TableColumn>
                        <TableColumn className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</TableColumn>
                        <TableColumn className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {paymentHistory.map((payment, idx) => (
                            <TableRow key={payment.id}>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{idx + 1}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.courseName}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payment.price}</TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${statusColors[payment.status] || "bg-gray-100 text-gray-800"}`}>
                                        {statusIcons[payment.status]}
                                        {payment.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default PaymentsPage;
