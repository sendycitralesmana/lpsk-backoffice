import React from 'react'
import ServiceCategoryAdd from '@/components/features/backoffice/service-category/service-category-add'
import { ServiceCategoryColumn } from '@/components/features/backoffice/service-category/service-category-column'
import { ServiceCategoryDataTable } from '@/components/features/backoffice/service-category/service-category-data-table'
import { getServiceCategories } from '@/server/service-category'

const ServiceCategoryPage = async () => {

    const serviceCategories = await getServiceCategories()

  return (
    <div className="space-y-3 py-3">
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3">
            <h1 className="text-2xl font-bold">Manajemen Kategori Layanan</h1>
            <ServiceCategoryAdd />
        </div>
        <ServiceCategoryDataTable columns={ServiceCategoryColumn} data={serviceCategories!} />
    </div>
  )
}

export default ServiceCategoryPage