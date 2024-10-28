'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { updateServiceCategorySchema, updateServiceCategorySchemaType } from '@/lib/schemas/service-category-schema'
import { updateServiceSchema, updateServiceSchemaType } from '@/lib/schemas/service-schema'
import { cn } from '@/lib/utils'
import { getService, updateService } from '@/server/service-action'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2Icon, EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ServiceUpdate = ({ id }: { id: string} ) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const status = ['DIAJUKAN', 'DITERIMA', 'DITOLAK']
    const { toast } = useToast()


    const form = useForm<updateServiceSchemaType>({
        resolver: zodResolver(updateServiceSchema),
        defaultValues: async () => {
            try {
                const { documentName, documentUrl, status } = await getService(id)
                return {
                    documentName,
                    documentUrl,
                    status
                }
            } catch (error) {
                return {
                    documentName: '',
                    documentUrl: '',
                    status: '',
                }
            }
        }
    })

    const submitHandler = async (data: updateServiceSchemaType) => {
        try {
            setLoading(true)
            await updateService(id, data)
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
                        <FormField control={form.control} name="documentName" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Dokumen</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Nama Dokumen" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="documentUrl" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Url Dokumen</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Url Dokumen" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="status" render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Kategori Layanan" {...field} />
                                </FormControl> */}

                                {/* select option DIAJUKAN, DINAIKAN, DITURUNKAN */}
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="DIAJUKAN">DIAJUKAN</SelectItem>
                                        <SelectItem value="DITERIMA">DITERIMA</SelectItem>
                                        <SelectItem value="DITOLAK">DITOLAK</SelectItem>
                                        {/* {status.map((item, index) => (
                                            <SelectItem key={index} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))} */}
                                    </SelectContent>
                                </Select>
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

export default ServiceUpdate