'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { updateServiceCategorySchema, updateServiceCategorySchemaType } from '@/lib/schemas/service-category-schema'
import { cn } from '@/lib/utils'
import { getServiceCategory, updateServiceCategory } from '@/server/service-category'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2Icon, EyeIcon, EyeOffIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ServiceCategoryUpdate = ({ id }: { id: string} ) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()


    const form = useForm<updateServiceCategorySchemaType>({
        resolver: zodResolver(updateServiceCategorySchema),
        defaultValues: async () => {
            try {
                const { name } = await getServiceCategory(id)
                return {
                    name
                }
            } catch (err) {
                return { name: "" }
                
            }
        }
    })

    const submitHandler = async (data: updateServiceCategorySchemaType) => {
        try {
            setLoading(true)
            await updateServiceCategory(id, data)
            toast({ 
                title: "Berhasil", 
                description: "Data berhasil diubah" 
            })
            form.reset()
            setOpen(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div>
        
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div className="flex gap-2">
                    <Edit2Icon size={20} /> <span>Edit</span>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ubah Kategori Layanan</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-3">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategori Layanan</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Kategori Layanan" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button className={cn("w-full", { "bg-muted-foreground": form.formState.isSubmitting })}>{form.formState.isSubmitting ? "Mengunggah..." : "UBAH"}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    </div>
  )
}

export default ServiceCategoryUpdate