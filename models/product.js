const product =
{
    productDB : [],

    initDB()
    {
        this.productDB.push({
            imgPath : "hard-disk1.jpg",
            desc : "Segate hard-disk 2TB - External cable for Windows/MAC",
            ratimg : "Star_rating_4_of_5.png",
            price : "CDN$ 80",
            featured : true
        })

        this.productDB.push({
            imgPath : "alexa.jpg",
            desc : "All-new Echo (3rd Gen) - Smart speaker with Alexa - Twilight Blue",
            ratimg : "Star_rating_4.5_of_5.png",
            price : "CDN$ 89.99",
            featured : true
        })

        this.productDB.push({
            imgPath : "fire-stick.jpg",
            desc : "Fire TV Stick with Alexa Voice Remote, streaming media player",
            ratimg : "Star_rating_4_of_5.png",
            price : "CDN$ 39.89",
            featured : true
        })

        this.productDB.push({
            imgPath : "bose.jpg",
            desc : "Bose SoundLink Color Bluetooth Speaker II- Limited Edition, Black",
            ratimg : "Star_rating_3.5_of_5.png",
            price : "CDN$ 169",
            featured : true
        })

        this.productDB.push({
            imgPath : "watch.jpg",
            desc : "Fitbit Versa 2 Health & Fitness Smartwatch with Music, Alexa",
            ratimg : "Star_rating_3.5_of_5.png",
            price : "CDN$ 199",
            featured : true
        })

        this.productDB.push({
            imgPath : "boat.jpg",
            desc : "Boat CDRZX110 Over-Ear Headphones (Black)",
            ratimg : "Star_rating_4.5_of_5.png",
            price : "CDN$ 24.98",
            featured : false
        })

    },

    getAllProducts()
    {
        return this.productDB;
    },

    getFeaturedProducts()
    {
        featuredDB = [];

        if(this.productDB.length > 0)
        {
            this.productDB.forEach(ele =>{

                if(ele.featured == true)
                {
                    featuredDB.push(ele);
                }
            })
        }

        return featuredDB;
    }

}

product.initDB();
module.exports = product;