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
import { ServiceCategoryDelete } from "./service-category-delete"
import ServiceCategoryUpdate from "./service-category-update"
import { TServiceCategory } from "@/types/service-category"
import Link from "next/link"
export const ServiceCategoryColumn: ColumnDef<TServiceCategory>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Kategori Layanan
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
      id: "services",
      header: "Layanan",
      cell: ({ row }) => {
        const serviceCategory = row.original
   
        return (
          <Link href={`/backoffice/service-category/${serviceCategory.id}/service`}>
            <Button variant="ghost" className="" title="Lihat layanan">
              <Eye className="h-4 w-4 mr-1" /> {serviceCategory._count.services} Layanan
            </Button>
          </Link>
        )
      },
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const serviceCategory = row.original
     
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
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className=" space-x-2"><ServiceCategoryUpdate id={serviceCategory.id}/></DropdownMenuItem>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className=" text-destructive space-x-2"><ServiceCategoryDelete id={serviceCategory.id} /></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
    },
]