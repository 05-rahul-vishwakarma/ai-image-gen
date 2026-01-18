'use client'

import React from 'react'
import { useProfileDataStore } from '@/lib/stores/profileDataStore'
import { PageTransition } from '@/components/animations/PageTransition'
import { User, Mail, Calendar, Globe } from 'lucide-react'
import Image from 'next/image'

export default function ProfilePage() {
  const { profileData } = useProfileDataStore()

  const user = profileData?.data?.user
  const session = profileData?.data?.session

  if (!user) {
    return (
      <PageTransition>
        <div className="h-full flex items-center justify-center">
          <p className="text-[var(--muted)]">Loading profile...</p>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--text)] mb-2">Profile</h1>
            <p className="text-[var(--muted)]">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className="glass-card p-6 space-y-6">
            {/* Avatar & Basic Info */}
            <div className="flex items-start gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex-shrink-0">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name || user.email}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                    {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[var(--text)] mb-1">
                  {user.name}
                </h2>
                <p className="text-[var(--muted)]">{user.email}</p>
              </div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg)]">
                <User className="h-5 w-5 text-primary-500" />
                <div>
                  <p className="text-xs text-[var(--muted)]">User ID</p>
                  <p className="text-sm font-medium text-[var(--text)]">{user.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg)]">
                <Mail className="h-5 w-5 text-primary-500" />
                <div>
                  <p className="text-xs text-[var(--muted)]">Email</p>
                  <p className="text-sm font-medium text-[var(--text)]">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg)]">
                <Calendar className="h-5 w-5 text-primary-500" />
                <div>
                  <p className="text-xs text-[var(--muted)]">Member Since</p>
                  <p className="text-sm font-medium text-[var(--text)]">
                    {new Date(user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg)]">
                <User className="h-5 w-5 text-primary-500" />
                <div>
                  <p className="text-xs text-[var(--muted)]">Username</p>
                  <p className="text-sm font-medium text-[var(--text)]">{user.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Information */}
          {session && (
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[var(--text)] mb-4">
                Current Session
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg)]">
                  <Globe className="h-5 w-5 text-primary-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-[var(--muted)]">IP Address</p>
                    <p className="text-sm font-medium text-[var(--text)]">
                      {session.ip_address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg)]">
                  <Globe className="h-5 w-5 text-primary-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-[var(--muted)]">Device</p>
                    <p className="text-sm font-medium text-[var(--text)] break-all">
                      {session.user_agent}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg)]">
                  <Calendar className="h-5 w-5 text-primary-500" />
                  <div>
                    <p className="text-xs text-[var(--muted)]">Last Activity</p>
                    <p className="text-sm font-medium text-[var(--text)]">
                      {new Date(session.last_activity).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg)]">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      session.is_active ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  />
                  <div>
                    <p className="text-xs text-[var(--muted)]">Status</p>
                    <p className="text-sm font-medium text-[var(--text)]">
                      {session.is_active ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
