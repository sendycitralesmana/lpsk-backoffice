import ServiceAdd from '@/components/features/backoffice/service/service-add'
import { ServiceColumnColumn } from '@/components/features/backoffice/service/service-column'
import { ServiceDataTable } from '@/components/features/backoffice/service/service-data-table'
import { getServices, getServicesByCategory } from '@/server/service-action'
import React from 'react'

const ServicePage = async ( {params: {id}}: {params: { id: string }} ) => {

  const services = await getServicesByCategory(id)

  return (
    <div className="space-y-3 py-3">
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3">
            <h1 className="text-2xl font-bold">Manajemen Layanan</h1>
            <ServiceAdd id={id}/>
        </div>
        <ServiceDataTable columns={ServiceColumnColumn} data={services} />
    </div>
  )
}

export default ServicePage