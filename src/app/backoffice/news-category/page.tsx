import NewsCategoryAdd from '@/components/features/backoffice/news-category/news-category-add'
import { NewsCategoryColumn } from '@/components/features/backoffice/news-category/news-category-column'
import { NewsCategoryDataTable } from '@/components/features/backoffice/news-category/news-category-data-table'
import { getNewsCategories } from '@/server/news-category'
import React from 'react'

const NewsCategoryPage = async () => {

    const newsCategories = await getNewsCategories()

  return (
    <div className="space-y-3 py-3">
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3">
            <h1 className="text-2xl font-bold">Manajemen Kategori Berita</h1>
            <NewsCategoryAdd />
        </div>
        <NewsCategoryDataTable columns={NewsCategoryColumn} data={newsCategories} />
    </div>
  )
}

export default NewsCategoryPage