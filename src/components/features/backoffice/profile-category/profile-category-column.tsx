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
import { ProfileCategoryDelete } from "./profile-category-delete"
import { TProfileCategory } from "@/types/profile-category"
import ProfileCategoryUpdate from "./profile-category-update"
export const ProfileCategoryColumn: ColumnDef<TProfileCategory>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Kategori Profil
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
      id: "profiles",
      header: "Profil",
      cell: ({ row }) => {
        const newsCategory = row.original
   
        return (
          <Link href={`/backoffice/profile-category/${newsCategory.id}/profile`}>
            <Button variant="ghost" className="" title="Lihat Aplikasi">
              <Eye className="h-4 w-4 mr-1" /> {newsCategory._count.profiles} Aplikasi
            </Button>
          </Link>
        )
      },
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const profileCategory = row.original
     
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
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className=" space-x-2"><ProfileCategoryUpdate id={profileCategory.id}/></DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className=" text-destructive space-x-2"><ProfileCategoryDelete id={profileCategory.id} /></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    },
]