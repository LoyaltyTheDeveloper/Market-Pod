// const baseUrl = "http://localhost:5000";
const baseUrl = "https://apis.emarketpod.com";

const apis = {
    getMarkets:baseUrl+"/site/getMarkets",
    getMarket:baseUrl+"/site/getMarket/",
    getStores:baseUrl+"/site/getStores",
    getStore:baseUrl+"/site/getStore/",
    getProduct:baseUrl+"/admin/getProduct/",
    addProduct:baseUrl+"/admin/addProduct/",
    editProduct:baseUrl+"/admin/editProduct/",
    getProducts:baseUrl+"/admin/getProducts/",
    addMarket:baseUrl+"/admin/addMarket/",
    editMarket:baseUrl+"/admin/editMarket/",
    addStore:baseUrl+"/admin/addStore/",
    openStores:baseUrl+"/admin/open-stores/",
    editStore:baseUrl+"/admin/editStore/",
    getCategories:baseUrl+"/site/getCategories/",
    getUsers:baseUrl+"/admin/get-users/",
    getOrders:baseUrl+"/admin/orders/",
    getOrderHistory:baseUrl+"/admin/orders?history=1",
    confirmOrders:baseUrl+"/admin/orders/confirm/",
    changeOrderStatus:baseUrl+"/admin/orders/change-status/",
    cancelOrders:baseUrl+"/admin/orders/cancel/",
    assignCarrier:baseUrl+"/admin/orders/assign-carrier",
    signin:baseUrl+"/admin/signin/",
    getAdmins:baseUrl+"/admin/getAdmins",
    getStat:baseUrl+"/admin/get-stat",
    getCarriers:baseUrl+"/admin/carriers",
    addAdmins:baseUrl+"/admin/addAdmin",
    updateAdmin:baseUrl+"/admin/updateAdminStatus"
}

export default apis;