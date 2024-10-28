import ProfileCategoryAdd from '@/components/features/backoffice/profile-category/profile-category-add'
import { ProfileCategoryColumn } from '@/components/features/backoffice/profile-category/profile-category-column'
import { ProfileCategoryDataTable } from '@/components/features/backoffice/profile-category/profile-category-data-table'
import { getProfileCategories } from '@/server/profile-category-action'
import React from 'react'

const ProfileCategoryPage = async () => {

    const profileCategories = await getProfileCategories()

  return (
    <div className="space-y-3 py-3">
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3">
            <h1 className="text-2xl font-bold">Manajemen Kategori Profil</h1>
            <ProfileCategoryAdd />
        </div>
        <ProfileCategoryDataTable columns={ProfileCategoryColumn} data={profileCategories!} />
    </div>
  )
}

export default ProfileCategoryPage