const categories = 
{
    categoriesDB : [],
    
    initDB()
    {
        this.categoriesDB.push({
            title: "Electronics",
            imgPath: "electronics.jpg"
        })

        this.categoriesDB.push({
            title: "Father's Day",
            imgPath: "fath.jpg"
        })

        this.categoriesDB.push({
            title: "Furnish your home",
            imgPath: "home.jpg"
        })

        this.categoriesDB.push({
            title: "Books",
            imgPath: "books.jpg"
        })

        this.categoriesDB.push({
            title: "Get fit at home",
            imgPath: "fit.jpg"
        })
    },

    getAllCategory()
    {
        return this.categoriesDB;
    },

    getFeaturedCategory()
    {
      
    }
}

categories.initDB();
module.exports = categories;