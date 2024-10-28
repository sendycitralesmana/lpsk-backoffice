import ApplicationCategoryAdd from '@/components/features/backoffice/application-category/application-category-add'
import { ApplicationCategoryColumn } from '@/components/features/backoffice/application-category/application-category-column'
import { ApplicationCategoryDataTable } from '@/components/features/backoffice/application-category/application-category-data-table'
import { getApplicationCategories } from '@/server/application-category-action'
import React from 'react'

const ApplicationCategoryPage = async () => {

  const applicationCategories = await getApplicationCategories()

  return (
    <div className="space-y-3 py-3">
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3">
            <h1 className="text-2xl font-bold">Manajemen Kategori Aplikasi</h1>
            <ApplicationCategoryAdd />
        </div>
        <ApplicationCategoryDataTable columns={ApplicationCategoryColumn} data={applicationCategories!} />
    </div>
  )
}

export default ApplicationCategoryPage