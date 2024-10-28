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
  
type NewsAddProps = {
    id: string
}

const NewsAdd = ( {id}: NewsAddProps ) => {
      
    const [open, setOpen] = useState(false)
    const { toast } = useToast()

    const form = useForm<createNewsSchemaType>({
        resolver: zodResolver(createNewsSchema),
        defaultValues: {
            title: '',
            content: '',
            cover: '',
            document: '',
            image: '',
            video: '',
            status: 'DIAJUKAN',
            newsCategoryId: id,
            userId: 'cm2c1d6ks0003zbo3x27kwaex'
        }
    })

    const submitHandler = async (data: createNewsSchemaType) => {
        try {
            await createNews(data)
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
            <DialogTitle>Tambah Layanan</DialogTitle>
          </DialogHeader>
          <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-3">
                    <FormField name="title" render={({ field }) => (
                        <FormItem>
                            <FormLabel> Judul</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Judul" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="content" render={({ field }) => (
                        <FormItem>
                            <FormLabel> Konten</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Masukan Konten" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="cover" render={({ field }) => (
                        <FormItem>
                            <FormLabel> Sampul</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Gambar" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="document" render={({ field }) => (
                        <FormItem>
                            <FormLabel> Dokumen</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Dokumen" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="image" render={({ field }) => (
                        <FormItem>
                            <FormLabel> Gambar</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Gambar" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="video" render={({ field }) => (
                        <FormItem>
                            <FormLabel> Video</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Video" {...field} />
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

export default NewsAdd;
