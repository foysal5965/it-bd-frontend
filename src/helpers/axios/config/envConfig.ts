export const getBaseUrl =(): string=>{
    return process.env.NEXT_DEVELOPMENT_URL || "https://itbd-backend.vercel.app/api/v1"
}