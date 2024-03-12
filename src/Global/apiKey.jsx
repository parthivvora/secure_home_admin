const BASE_URL = "http://localhost:5000/api/admin/"

const GET = "get"
const POST = "post"
const PUT = "put"
const DELETE = "delete"

const apiKeys = {
    adminLogin: `${BASE_URL}login`,
    generateSecurityInfo: `${BASE_URL}generateSecurityInfo`,
    getAllSocietyInfo: `${BASE_URL}getAllSocietyInfo`,
    getSingleSocietyInfo: `${BASE_URL}getSingleSocietyInfo/`,
    updateSocietyInfo: `${BASE_URL}updateSocietyInfo/`,
    getAllUserInfo: `${BASE_URL}getAllUserInfo/`,
    getAllInfoDash: `${BASE_URL}getAllInfoDash`,
}

export { BASE_URL, GET, POST, PUT, DELETE, apiKeys }