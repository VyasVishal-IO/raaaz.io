'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { UserCircle, LogIn, LogOut } from 'lucide-react'

const Navbar = () => {
  const { data: session, status } = useSession()
  const user = session?.user

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/' })
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav className="bg-black border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" // Update to the correct path if different, e.g., /images/logo.png
              alt="Raaaz.io Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Raaaz.io
            </span>
          </Link>

          {/* Right side navigation items */}
          <div className="flex items-center gap-6">
            {status === 'loading' ? (
              <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse" />
            ) : session ? (
              <>
                {/* User Profile Section */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <UserCircle className="h-8 w-8 text-gray-300" />
                    <span className="text-gray-300 hidden sm:block text-sm">
                      {user.username || user.email?.split('@')[0]}
                    </span>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-600 
                             text-white bg-transparent hover:bg-gray-700 transition duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="hidden sm:block">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              /* Login Button */
              <Link
                href="/sign-in"
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-600 
                           text-white bg-transparent hover:bg-gray-700 transition duration-200"
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
