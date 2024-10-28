import NewsAdd from '@/components/features/backoffice/news/news-add'
import { NewsColumn } from '@/components/features/backoffice/news/news-column'
import { NewsDataTable } from '@/components/features/backoffice/news/news-data-table'
import { getNews, getNewsByCategory } from '@/server/news-action'
import React from 'react'

const NewsPage = async ( {params: {id}}: {params: {id: string}} ) => {

  const news = await getNewsByCategory(id)
  console.log(news)

  return (
    <div className="space-y-3 py-3">
        <div className="flex flex-col xl:flex-row xl:justify-between gap-3">
            <h1 className="text-2xl font-bold">Manajemen Berita</h1>
            <NewsAdd id={id}/>
        </div>
        <NewsDataTable columns={NewsColumn} data={news} />
    </div>
  )
}

export default NewsPage