const aliasToken="token"
const aliasInfo="userInfo"
export const setToken=(token)=>{
    localStorage.setItem(aliasToken,token)
}
export const getToken=()=>{
    return localStorage.getItem(aliasToken)
}
export const removeTokenAndUserInfo=()=>{
    localStorage.removeItem(aliasToken)
    localStorage.removeItem(aliasInfo)

}
export const setUserInfo=(userInfo)=>{
    localStorage.setItem(aliasInfo,JSON.stringify(userInfo))
}
export const getUserInfo=()=>{
    return JSON.parse(localStorage.getItem(aliasInfo)||"{}")
}