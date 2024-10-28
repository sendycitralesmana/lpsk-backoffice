import RoleAdd from '@/components/features/backoffice/role/role-add'
import { RoleColumn } from '@/components/features/backoffice/role/role-column'
import { RoleDataTable } from '@/components/features/backoffice/role/role-data-table'
import { getRoles } from '@/server/role-action'
import React from 'react'

const RolePage = async () => {

    const roles = await getRoles()

  return (
    <div className="space-y-3 py-3">
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3">
            <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
            <RoleAdd />
        </div>
        <RoleDataTable columns={RoleColumn} data={roles!} />
    </div>
  )
}

export default RolePage