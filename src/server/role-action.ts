'use server'

import prisma from '@/lib/prisma'
import { createRoleSchemaType, updateRoleSchemaType } from '@/lib/schemas/role-schema'
import { revalidatePath } from 'next/cache'

export const getRoles = async () => {
    try {
        const roles = await prisma.role.findMany()
        return roles
    } catch (error) {
        console.log(error)
    }
}

export const getRole = async (id: string) => {
    const role = await prisma.role.findFirstOrThrow({
        where: {
            id
        }
    })
    return role
}

export const createRole = async (data: createRoleSchemaType) => {
    try {
        const role = await prisma.role.create({
            data
        })
        revalidatePath('/backoffice/role')
        return role
    } catch (error) {
        console.log(error)
    }
}

export const updateRole = async (id: string, data: updateRoleSchemaType) => {
    try {
        const role = await prisma.role.update({
            where: {
                id
            },
            data
        })
        revalidatePath('/backoffice/role')
        return role
    } catch (error) {
        console.log(error)
    }
}

export const deleteRole = async (id: string) => {
    try {
        const role = await prisma.role.delete({
            where: {
                id
            }
        })
        revalidatePath('/backoffice/role')
        return role
    } catch (error) {
        console.log(error)
    }
}