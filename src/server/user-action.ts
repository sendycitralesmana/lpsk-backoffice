'use server'

import prisma from '@/lib/prisma'
import { createUserSchemaType, updateUserSchemaType } from '@/lib/schemas/user-schema'
import { revalidatePath } from 'next/cache'

export const getUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'asc',
            },
        })
        return users
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (id: string) => {
    const user = await prisma.user.findFirstOrThrow({
        where: {
            id,
        },
    })
    return user
}

export const createUser = async (data: createUserSchemaType) => {
    try {
        const user = await prisma.user.create({
            data,
        })
        revalidatePath('/backoffice/user')
        return user
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (id: string) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id,
            },
        })
        revalidatePath('/backoffice/user')
        return user
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (id: string, data: updateUserSchemaType) => {
    try {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data,
        })
        revalidatePath('/backoffice/user')
        return user
    } catch (error) {
        console.log(error)
    }
}