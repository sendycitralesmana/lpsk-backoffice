'use client'

import { Button } from "@/components/ui/button"
import { TUser } from "@/types/user"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye } from "lucide-react"

import { MoreHorizontal } from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NewsCategoryDelete } from "./news-category-delete"
import NewsCategoryUpdate from "./news-category-update"
import Link from "next/link"
import { TNewsCategory } from "@/types/news-category"
export const NewsCategoryColumn: ColumnDef<TNewsCategory>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Kategori Berita
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
      id: "news",
      header: "Berita",
      cell: ({ row }) => {
        const newsCategory = row.original
   
        return (
          <Link href={`/backoffice/news-category/${newsCategory.id}/news`}>
            <Button variant="ghost" className="" title="Lihat Berita">
              <Eye className="h-4 w-4 mr-1" /> {newsCategory._count.news} Berita
            </Button>
          </Link>
        )
      },
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const role = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className=" space-x-2"><NewsCategoryUpdate id={role.id}/></DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className=" text-destructive space-x-2"><NewsCategoryDelete id={role.id} /></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    },
]