'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { updateProfileSchema, updateProfileSchemaType } from '@/lib/schemas/profile-schema'
import { cn } from '@/lib/utils'
import { getNewsById, updateNews } from '@/server/news-action'
import { getProfile, updateProfile } from '@/server/profile-action'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2Icon, EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ProfileUpdate = ({ id }: { id: string} ) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const status = ['DIAJUKAN', 'DITERIMA', 'DITOLAK']
    const { toast } = useToast()


    const form = useForm<updateProfileSchemaType>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: async () => {
            try {
                const { name, description, foto } = await getProfile(id)
                return {
                    name,
                    description,
                    foto
                }
            } catch (error) {
                return {
                    name: '',
                    description: '',
                    foto: ''
                }
            }
        }
    })

    const submitHandler = async (data: updateProfileSchemaType) => {
        try {
            setLoading(true)
            await updateProfile(id, data)
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
                    <DialogTitle>Ubah Kategori Berita</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-3">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Deskripsi</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Masukan Deskripsi" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="foto" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Foto</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Cover" {...field} />
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

export default ProfileUpdate