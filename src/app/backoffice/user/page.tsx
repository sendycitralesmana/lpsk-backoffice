import TableUser from '@/components/features/backoffice/user/table-user'
import UserAdd from '@/components/features/backoffice/user/user-add'
import { userColumn } from '@/components/features/backoffice/user/user-column'
import { DataTable } from '@/components/ui/data-table'
import { getUsers } from '@/server/user-action'
import React from 'react'

const UserPage = async () => {

    const users = await getUsers()

  return (
    <div>
        
        <div className="space-y-3 py-3">
            <div className="flex flex-col xl:flex-row xl:justify-between gap-3">
                <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
                <UserAdd />
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                <div className="bg-background px-3 py-2 rounded">
                    <h3 className="text-base">Pengguna Aktif</h3>
                    <span className=" text-2xl font-bold">{}</span>
                </div>
                <div className="bg-background px-3 py-2 rounded">
                    <h3 className="text-base">Pengguna Non Aktif</h3>
                    <span className=" text-2xl font-bold">{}</span>
                </div>
            </div> */}
            {/* <TableUser data={users}/> */}
            <DataTable columns={userColumn} data={users!} />
        </div>

    </div>
  )
}

export default UserPage