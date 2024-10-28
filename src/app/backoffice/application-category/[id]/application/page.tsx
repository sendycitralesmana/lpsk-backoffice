import ApplicationAdd from '@/components/features/backoffice/application/application-add'
import { ApplicationColumn } from '@/components/features/backoffice/application/application-column'
import { ApplicationDataTable } from '@/components/features/backoffice/application/application-data-table'
import { getApplicationsByCategory } from '@/server/application-action'
import React from 'react'

const ApplicationPage = async ( {params: {id}}: {params: {id: string}} ) => {

    const applications = await getApplicationsByCategory(id)

  return (
    <div className="space-y-3 py-3">
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3">
            <h1 className="text-2xl font-bold">Manajemen Berita</h1>
            <ApplicationAdd id={id}/>
        </div>
        <ApplicationDataTable columns={ApplicationColumn} data={applications} />
    </div>
  )
}

export default ApplicationPage