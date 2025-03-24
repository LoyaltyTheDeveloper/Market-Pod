const { connectDB } = require("../config/db");

require("dotenv").config();

const appData = {
    getBaseUrl: function () {
        return process.env.MODE == "dep" ? "https://apis.emarketpod.com/" : "http://localhost:5000/";
    },
    getCategories:async function(){
        const db = await connectDB();
        conn = await db.getConnection();

        const [categories] = await conn.query("SELECT id , cat_name AS name FROM categories");
        return categories
    },
    getCategoryById: function (list,id){
        let category = "";
        for(x of list){
            if(x.id == id){
                category = x.name;
                break;
            }        
        }
        return category
    }
}

module.exports = {
    appData
}