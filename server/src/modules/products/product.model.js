// product.model.js
export default class ProductModel{
    constructor(name,desc,price,imageUrl,category,sizes,rating,discountPercentage){
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category=category;
        this.sizes=sizes;
        this.rating=rating;
        this.discountPercentage=discountPercentage;
    }
}