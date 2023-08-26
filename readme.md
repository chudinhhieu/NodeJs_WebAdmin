# Chuyển sang làm việc với assignment_mob402_ph29636
use assignment_mob402_ph29636

# Tạo collection
db.createCollection("tb_categories"); 

# Tạo đối tượng dữ liệu
db.tb_categories.insertMany([{name:"Smart Phone"},{name:"Laptop"},{name:"Smart Watch"},{name:"Ear Phone"},{name:"Tablet"}]);

db.tb_products.insertOne({name:"Iphone XS Max",id_category:"64bf3ab51e17f8a7f80f59f1",description:"4GB Ram and 128GB Rom",price:8000000,image:"image"});
