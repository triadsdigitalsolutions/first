"use client";
import { Bell, Link as LinkIcon, Copy } from "lucide-react";
import { useState } from "react";

const notifications = [
    {
        id: 1,
        title: "Welcome to Triads!",
        description: "Thank you for joining. Stay tuned for updates.",
        time: "2 hours ago",
        read: false,
    },
    {
        id: 2,
        title: "Profile Updated",
        description: "Your profile information was successfully updated.",
        time: "1 day ago",
        read: true,
    },
    {
        id: 3,
        title: "Check out HeroUI!",
        description: "Explore the new HeroUI component library.",
        time: "just now",
        read: false,
        link: "https://heroui.dev",
    },
];

export default function NotificationsPage() {
    const [copiedId, setCopiedId] = useState<number | null>(null);

    const handleCopy = async (link: string, id: number) => {
        await navigator.clipboard.writeText(link);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1500);
    };

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="flex items-center mb-6">
                <Bell className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-2xl font-bold">Notifications</h1>
            </div>
            <ul className="space-y-4">
                {notifications.length === 0 ? (
                    <li className="text-gray-500">No notifications yet.</li>
                ) : (
                    notifications.map((n) => (
                        <li
                            key={n.id}
                            className={`rounded-lg border p-4 shadow-sm flex flex-col ${
                                n.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{n.title}</span>
                                <span className="text-xs text-gray-400">{n.time}</span>
                            </div>
                            <p className="text-gray-700 mt-1">{n.description}</p>
                            {n.link && (
                                <div className="flex items-center mt-2 space-x-2">
                                    <a
                                        href={n.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-600 hover:underline"
                                    >
                                        <LinkIcon className="h-4 w-4 mr-1" />
                                        {n.link}
                                    </a>
                                    <button
                                        onClick={() => handleCopy(n.link!, n.id)}
                                        className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded transition"
                                    >
                                        <Copy className="h-4 w-4 mr-1" />
                                        {copiedId === n.id ? "Copied!" : "Copy"}
                                    </button>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}