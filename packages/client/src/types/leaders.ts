export type LeaderDataDTO = {
    id: number
    login: string
    score: number
}

export type LeaderData = {
    id: number
    user: string
    score: number
}

export type LeadersReq = {
    ratingFieldName: string
    cursor: number
    limit: number
}

export type NewLeader = {
    ratingFieldName: string
    teamName: string
}
