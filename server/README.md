# mini-wordpress-server

### User End Points
|Route|HTTP|Header(s)|Body|Description|Success|Error
|---------|---------|---------|---------|---------|-------------|---------------|
|_/users/register_|**POST**|none|name, email, password, address|Manual sign up|Status(201); Data: {...} | 1. Status(400); Data: [ ... ] 2. Status(500); Message: 'Internal server error'|
|_/users/login_|**POST**|none|email, password|Login|Status(200); Data: {token: ...} | 1. Status(422); Message: `Wrong email/password` 2. Status(500); Message: 'Internal server error'|
|_/users_|**GET**|none|none|Get all users|Status(200); Data: [{ ... }] | 1. Status(500); Message: 'Internal server error'|
|_/users/:id_|**GET**|none|none|Find a user|Status(200); Data: {msg: ..., user: { ... } } | 1. Status(500); Message: 'Internal server error'|
|_/users/:id_|**PATCH**|none|access_token|Edit a user|Status(200); Data: {msg: ... } | 1. Status(500); Message: 'Internal server error'|


### Products End Points
|Route|HTTP|Header(s)|Body|Description|Success|Error
|---------|---------|---------|---------|---------|-------------|---------------|
|_/products/_|**GET**|none|none|Get all products|Status(200); Data: [{...}] | 1. Status(500); Message: 'Internal server error'|
|_/products_|**POST**|access_token|name, description, stock, price, image|Add Product|Status(201); Data: { ...} | 1. Status(400); Data: [ ... ] 2. Status(500); Message: 'Internal server error'|
|_/products/:id_|**GET**|none|none|Find a product|Status(200); Data: { ... } | 1. Status(500); Message: 'Internal server error'|
|_/products/:id_|**PUT**|access_token|none|Edit product|Status(200); Data: {msg: ... } | 1. Status(400); Data: [ ... ] 2. Status(500); Message: 'Internal server error'|
|_/products/:id_|**DELETE**|access_token|none|Remove a product|Status(200); Data: {msg: ... } | 1. Status(500); Message: 'Internal server error'|

### Cart End Points
|Route|HTTP|Header(s)|Body|Description|Success|Error
|---------|---------|---------|---------|---------|-------------|---------------|
|_/carts_|**GET**|access_token|none|Find user cart|Status(200); Data: {...} | 1. Status(500); Message: 'Internal server error'|
|_/carts_|**POST**|access_token|user, products|Add Cart|Status(201); Data: { ...} | 1. Status(500); Message: 'Internal server error'|
|_/carts_|**DELETE**|access_token|none|Clear cart|Status(200); Data: {msg: ... } | 1. Status(500); Message: 'Internal server error'|
|_/carts/remove-products/:productId_|**PUT**|access_token|none|Remove a kind of product from cart|Status(200); Data: {msg: ... } | 1. Status(500); Message: 'Internal server error'|
|_/carts/add-to-cart/:productId_|**PUT**|access_token|none|Add a piece of product in cart|Status(200); Data: {msg: ... } | 1. Status(500); Message: 'Internal server error'|
|_/carts/remove-product-from-cart/:productId_|**PUT**|access_token|none|Remove a piece of product in cart|Status(200); Data: {msg: ... } | 1. Status(500); Message: 'Internal server error'|

## Usage
```
npm install
npm start
live-server --host=localhost (Run it on client side)
```
> Run on http://localhost:8080