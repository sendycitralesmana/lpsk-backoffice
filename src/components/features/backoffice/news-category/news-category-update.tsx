'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { updateNewsCategorySchema, updateNewsCategorySchemaType } from '@/lib/schemas/news-category-schema'
import { cn } from '@/lib/utils'
import { getNewsCategory, updateNewsCategory } from '@/server/news-category'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2Icon, EyeIcon, EyeOffIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const NewsCategoryUpdate = ({ id }: { id: string} ) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()


    const form = useForm<updateNewsCategorySchemaType>({
        resolver: zodResolver(updateNewsCategorySchema),
        defaultValues: async () => {
            try {
                const { name } = await getNewsCategory(id)
                return {
                    name
                }
            } catch (err) {
                return { name: "" }
                
            }
        }
    })

    const submitHandler = async (data: updateNewsCategorySchemaType) => {
        try {
            setLoading(true)
            await updateNewsCategory(id, data)
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
                                <FormLabel>Kategori Berita</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Kategori Berita" {...field} />
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

export default NewsCategoryUpdate