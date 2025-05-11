"use client"
import React, { useState } from 'react'
import {
  BookOpen,
  CreditCard,
  Bell,
  Menu,
  X,
  User,
} from 'lucide-react'


const navigation = [
  { name: 'Courses', icon: BookOpen, href: '/dashboard/courses' },
  { name: 'Payments', icon: CreditCard, href: '/dashboard/payments' },
  { name: 'Notifications', icon: Bell, href: '/dashboard/notifications' },
  { name: 'My account', icon: User, href: '/dashboard/myaccount' },
]

function Sidebar() {
  const [open, setOpen] = useState(false)
  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex  justify-between bg-white border-b px-4 py-3">
        <span className="hidden md:inline text-2xl font-bold text-gray-800">Dashboard</span>
        <button
          aria-label="Open sidebar"
          onClick={() => setOpen(true)}
          className="text-gray-700"
        >
          <Menu className="h-7 w-7" />
        </button>
      </div>
      {/* Sidebar */}
      {/* Desktop sidebar: always visible, Mobile sidebar: visible only when open */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 bg-white border-r max-w-60 w-60 flex-col py-6 px-4
          transform transition-transform duration-200 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:min-h-screen md:py-6 md:px-4 md:z-auto
          flex
          ${open ? '' : 'hidden'}
          md:flex
        `}
      >
        <div className="flex items-center justify-between mb-8 md:mb-8">
          <span className="hidden md:inline text-2xl font-bold text-gray-800">DASHBOARD</span>
          <button
            aria-label="Close sidebar"
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-700"
          >
            <X className="h-7 w-7" />
          </button>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-6 w-6 mr-3 text-gray-500" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
