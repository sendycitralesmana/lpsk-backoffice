'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { updateNewsSchema, updateNewsSchemaType } from '@/lib/schemas/news-schema'
import { cn } from '@/lib/utils'
import { getNewsById, updateNews } from '@/server/news-action'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2Icon, EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const NewsUpdate = ({ id }: { id: string} ) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const status = ['DIAJUKAN', 'DITERIMA', 'DITOLAK']
    const { toast } = useToast()


    const form = useForm<updateNewsSchemaType>({
        resolver: zodResolver(updateNewsSchema),
        defaultValues: async () => {
            try {
                const { title, content, cover, document, image, video, status } = await getNewsById(id)
                return {
                    title,
                    content,
                    cover,
                    document,
                    image,
                    video,
                    status
                }
            } catch (error) {
                return {
                    title: '',
                    content: '',
                    cover: '',
                    document: '',
                    image: '',
                    video: '',
                    status: ''
                }
            }
        }
    })

    const submitHandler = async (data: updateNewsSchemaType) => {
        try {
            setLoading(true)
            await updateNews(id, data)
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
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Judul</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="content" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Konten</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Konten" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="cover" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sampul</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Cover" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="document" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dokumen</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Document" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="image" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gambar</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Image" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="video" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Video</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Video" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="status" render={({ field }) => (
                            <FormItem>
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

export default NewsUpdate