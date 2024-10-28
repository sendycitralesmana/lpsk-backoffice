'use client'

import { Button } from "@/components/ui/button"
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
import Link from "next/link"
import { TApplicationCategory } from "@/types/application-category"
import ApplicationCategoryUpdate from "./application-category-update"
import { ApplicationCategoryDelete } from "./application-category-delete"
export const ApplicationCategoryColumn: ColumnDef<TApplicationCategory>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Kategori Aplikasi
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
      id: "applications",
      header: "Aplikasi",
      cell: ({ row }) => {
        const newsCategory = row.original
   
        return (
          <Link href={`/backoffice/application-category/${newsCategory.id}/application`}>
            <Button variant="ghost" className="" title="Lihat Aplikasi">
              <Eye className="h-4 w-4 mr-1" /> {newsCategory._count.applications} Aplikasi
            </Button>
          </Link>
        )
      },
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const newsCategory = row.original
     
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
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className=" space-x-2"><ApplicationCategoryUpdate id={newsCategory.id}/></DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className=" text-destructive space-x-2"><ApplicationCategoryDelete id={newsCategory.id} /></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    },
]