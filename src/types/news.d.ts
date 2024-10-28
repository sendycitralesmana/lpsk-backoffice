export type TNews = {
    id: string
    title: string
    content: string
    cover?: string
    document?: string
    image?: string
    video?: string
    status: "DIAJUKAN" | "DITERIMA" | "DITOLAK"
    newsCategoryId?: string
    userId?: string
}