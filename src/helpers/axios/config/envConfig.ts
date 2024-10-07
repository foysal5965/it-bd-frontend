export const getBaseUrl =(): string=>{
    return process.env.NEXT_DEVELOPMENT_URL || "http://localhost:3000/api/v1"
}