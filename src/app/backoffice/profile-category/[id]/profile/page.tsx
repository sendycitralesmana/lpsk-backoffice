import ProfileAdd from '@/components/features/backoffice/profile/profile-add'
import { ProfileColumn } from '@/components/features/backoffice/profile/profile-column'
import { ProfileDataTable } from '@/components/features/backoffice/profile/profile-data-table'
import { getProfilesByCategory } from '@/server/profile-action'
import React from 'react'

const ProfilePage = async ( {params: {id}}: {params: {id: string}} ) => {

    const profiles = await getProfilesByCategory(id)

  return (
    <div className="space-y-3 py-3">
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3">
            <h1 className="text-2xl font-bold">Manajemen Kategori Berita</h1>
            <ProfileAdd id={id} />
        </div>
        <ProfileDataTable columns={ProfileColumn} data={profiles} />
    </div>
  )
}

export default ProfilePage