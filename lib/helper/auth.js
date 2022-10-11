const getBearerToken = (req) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) return null

    const authSegments = authHeader.split(" ")
    if (!authSegments || authSegments.length < 2) return null
    if (authSegments[0].toLowerCase() != "bearer") return null

    return authSegments[1]
}

export default {
    getBearerToken
}