export type TService = {
    id: string
    name: string
    documentName: string
    documentUrl: string
    status: "DIAJUKAN" | "DITERIMA" | "DITOLAK"
    serviceCategoryId?: string
}