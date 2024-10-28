'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { updateApplicationCategorySchema, updateApplicationCategorySchemaType } from '@/lib/schemas/application-category-schema'
import { updateProfileCategorySchema, updateProfileCategorySchemaType } from '@/lib/schemas/profile-category'
import { cn } from '@/lib/utils'
import { getApplicationCategory, updateApplicationCategory } from '@/server/application-category-action'
import { getProfileCategory, updateProfileCategory } from '@/server/profile-category-action'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2Icon, EyeIcon, EyeOffIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const ProfileCategoryUpdate = ({ id }: { id: string} ) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()


    const form = useForm<updateProfileCategorySchemaType>({
        resolver: zodResolver(updateProfileCategorySchema),
        defaultValues: async () => {
            try {
                const { name } = await getProfileCategory(id)
                return {
                    name
                }
            } catch (err) {
                return { name: "" }
                
            }
        }
    })

    const submitHandler = async (data: updateProfileCategorySchemaType) => {
        try {
            setLoading(true)
            await updateProfileCategory(id, data)
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
                    <DialogTitle>Ubah Kategori Profil</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-3">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategori Profil</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukan Kategori Profil" {...field} />
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

export default ProfileCategoryUpdate