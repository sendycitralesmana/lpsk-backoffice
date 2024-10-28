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
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { createServiceSchema, createServiceSchemaType } from "@/lib/schemas/service-schema";
import { createService } from "@/server/service-action";
import { createNewsSchema, createNewsSchemaType } from "@/lib/schemas/news-schema";
import { createNews } from "@/server/news-action";
import { Textarea } from "@/components/ui/textarea";
import { createProfileSchema, createProfileSchemaType } from "@/lib/schemas/profile-schema";
import { createProfile } from "@/server/profile-action";
  
type ProfileAddProps = {
    id: string
}

const ProfileAdd = ( {id}: ProfileAddProps ) => {
      
    const [open, setOpen] = useState(false)
    const { toast } = useToast()

    const form = useForm<createProfileSchemaType>({
        resolver: zodResolver(createProfileSchema),
        defaultValues: {
            name: "",
            description: "",
            foto: "",
            profileCategoryId: id
        }
    })

    const submitHandler = async (data: createProfileSchemaType) => {
        try {
            await createProfile(data)
            console.log('berhasil tambah data')
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
            <DialogTitle>Tambah Profil</DialogTitle>
          </DialogHeader>
          <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-3">
                    <FormField name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel> Nama</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Nama" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="description" render={({ field }) => (
                        <FormItem>
                            <FormLabel> Deskripsi</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Masukan Deskripsi" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="foto" render={({ field }) => (
                        <FormItem>
                            <FormLabel> Foto</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Foto" {...field} />
                            </FormControl>
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

export default ProfileAdd;
