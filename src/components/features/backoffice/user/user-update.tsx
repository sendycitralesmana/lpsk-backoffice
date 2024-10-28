'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { updateUserSchema, updateUserSchemaType } from '@/lib/schemas/user-schema'
import { cn } from '@/lib/utils'
import { getUser, updateUser } from '@/server/user-action'
import { TUser } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2Icon, EyeIcon, EyeOffIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const UserUpdate = ({ id }: { id: string} ) => {

    const [obsecure, setObsecure] = useState(true)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()


    const form = useForm<updateUserSchemaType>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: async () => {
            try {
                const {email, name, password} = await getUser(id)
                return {
                    email, name, password
                }
            } catch (err) {
                return {email: " ", name: " ", password: " "}
                
            }
        }
    })

    const submitHandler = async (data: updateUserSchemaType) => {
        try {
            setLoading(true)
            await updateUser(id, data)
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
                    <DialogTitle>Ubah Pengguna</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-3">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder="Masukan Nama" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <div className="flex gap-2">
                                    <FormControl className="flex-1">
                                        <Input placeholder="Masukan Kata Sandi" {...field} type={obsecure ? "password" : "text"} />
                                    </FormControl>
                                    <Button type="button" size={'icon'} variant={'outline'} onClick={() => setObsecure(!obsecure)}>
                                        {obsecure ? <EyeIcon /> : <EyeOffIcon />}
                                    </Button>
                                </div>
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

export default UserUpdate