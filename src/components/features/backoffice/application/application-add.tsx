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
import { createApplicationSchema, createApplicationSchemaType } from "@/lib/schemas/application-schema";
import { createApplication } from "@/server/application-action";
  
type ApplicationAddProps = {
    id: string
}

const ApplicationAdd = ( {id}: ApplicationAddProps ) => {
      
    const [open, setOpen] = useState(false)
    const { toast } = useToast()

    const form = useForm<createApplicationSchemaType>({
        resolver: zodResolver(createApplicationSchema),
        defaultValues: {
            title: '',
            cover: '',
            url: '',
            applicationCategoryId: id
        }
    })

    const submitHandler = async (data: createApplicationSchemaType) => {
        try {
            await createApplication(data)
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
            <DialogTitle>Tambah Aplikasi</DialogTitle>
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
                    <FormField name="cover" render={({ field }) => (
                        <FormItem>
                            <FormLabel> Sampul</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Sampul" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="url" render={({ field }) => (
                        <FormItem>
                            <FormLabel> Url</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Url" {...field} />
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

export default ApplicationAdd;
