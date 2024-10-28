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
import { createNewsCategory } from "@/server/news-category";
import { createNewsCategorySchema, createNewsCategorySchemaType } from "@/lib/schemas/news-category-schema";
  
const NewsCategoryAdd = () => {
      
    const [open, setOpen] = useState(false)
    const { toast } = useToast()

    const form = useForm<createNewsCategorySchemaType>({
        resolver: zodResolver(createNewsCategorySchema),
        defaultValues: {
            name: '',
        }
    })

    const submitHandler = async (data: createNewsCategorySchemaType) => {
        try {
            await createNewsCategory(data)
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
            <DialogTitle>Tambah Kategori Berita</DialogTitle>
          </DialogHeader>
          <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-3">
                    <FormField name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kaegori Berita</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Kategori Berita" {...field} />
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

export default NewsCategoryAdd;
