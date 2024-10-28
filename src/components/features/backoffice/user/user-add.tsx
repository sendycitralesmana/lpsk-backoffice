'use client'

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { createUserSchemaType } from "@/lib/schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/lib/schemas/user-schema";
import { createUser } from "@/server/user-action";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
  
const UserAdd = () => {
      
    const [obsecure, setObsecure] = useState(true)
    const [open, setOpen] = useState(false)
    const { toast } = useToast()

    const form = useForm<createUserSchemaType>({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            image: '',
        }
    })

    const submitHandler = async (data: createUserSchemaType) => {
        try {
            await createUser(data)
            toast({ 
                title: "Berhasil", 
                description: "Data berhasil ditambahkan" 
            })
            form.reset()
            setOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button asChild>
            <DialogTrigger>
                Tambah Data
            </DialogTrigger>
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Pengguna</DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>
          <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-3">
                    <FormField name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Nama" {...field} />
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
                    <Button className={cn("w-full", { "bg-muted-foreground": form.formState.isSubmitting })}>{form.formState.isSubmitting ? "Mengunggah..." : "TAMBAH"}</Button>
                </form>
            </Form> 
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserAdd;
