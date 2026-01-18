'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { User, Settings, LogOut } from 'lucide-react'
import { useLogout } from '@/hooks'
import { useProfileDataStore } from '@/lib/stores/profileDataStore'
import { Dropdown, DropdownItem } from '@/components/ui/Dropdown'
import toast from 'react-hot-toast'
import Image from 'next/image'

interface UserMenuProps {
  onSettingsClick: () => void
}

export const UserMenu: React.FC<UserMenuProps> = ({ onSettingsClick }) => {
  const router = useRouter()
  const { logout } = useLogout()
  const { profileData } = useProfileDataStore()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      router.push('/auth')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  const handleProfileClick = () => {
    router.push('/dashboard/profile')
  }

  const user = profileData?.data?.user

  if (!user) return null

  return (
    <Dropdown
      trigger={
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--surface)] transition-colors cursor-pointer">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name || user.email}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-semibold">
                {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
              </div>
            )}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-[var(--text)]">
              {user.name || 'User'}
            </p>
            <p className="text-xs text-[var(--muted)]">{user.email}</p>
          </div>
        </div>
      }
    >
      <DropdownItem icon={<User className="h-4 w-4" />} onClick={handleProfileClick}>
        Profile
      </DropdownItem>
      <DropdownItem
        icon={<Settings className="h-4 w-4" />}
        onClick={onSettingsClick}
      >
        Settings
      </DropdownItem>
      <DropdownItem
        icon={<LogOut className="h-4 w-4" />}
        onClick={handleLogout}
        danger
      >
        Logout
      </DropdownItem>
    </Dropdown>
  )
}
