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
import { createServiceCategorySchema, createServiceCategorySchemaType } from "@/lib/schemas/service-category-schema";
import { createServiceCategory, getServiceCategory } from "@/server/service-category";
import { createServiceSchema, createServiceSchemaType } from "@/lib/schemas/service-schema";
import { createService } from "@/server/service-action";
import { TServiceCategory } from "@/types/service-category";
  
type ServiceAddProps = {
    id: string
}

const ServiceAdd = ( {id}: ServiceAddProps ) => {
      
    const [open, setOpen] = useState(false)
    const { toast } = useToast()

    const form = useForm<createServiceSchemaType>({
        resolver: zodResolver(createServiceSchema),
        defaultValues: {
            documentName: '',
            documentUrl: '',
            status: 'DIAJUKAN',
            serviceCategoryId: id
        }
    })

    const submitHandler = async (data: createServiceSchemaType) => {
        try {
            await createService(data)
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
                    <FormField name="documentName" render={({ field }) => (
                        <FormItem>
                            <FormLabel> Nama Dokumen</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Nama Dokumen" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField name="documentUrl" render={({ field }) => (
                        <FormItem>
                            <FormLabel> Url Dokumen</FormLabel>
                            <FormControl>
                                <Input placeholder="Masukan Url Dokumen" {...field} />
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

export default ServiceAdd;
