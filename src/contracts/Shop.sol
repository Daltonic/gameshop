//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Shop {
    enum OrderEnum {
        PLACED,
        DELEVIRED,
        CANCELED,
        REFUNDED
    }

    struct ProductStruct {
        uint id;
        string sku;
        address seller;
        string name;
        string imageURL;
        string description;
        uint price;
        uint timestamp;
        bool deleted;
        uint stock;
    }

    struct OrderStruct {
        uint id;
        string sku;
        string name;
        string imageURL;
        address buyer;
        address seller;
        uint qty;
        uint total;
        uint timestamp;
        string destination;
        string phone;
        OrderEnum status;
    }

    struct CartStruct {
        uint id;
        uint qty;
    }

    struct BuyerStruct {
        address buyer;
        uint price;
        uint qty;
        uint timestamp;
    }

    struct ShopStats {
        uint products;
        uint orders;
        uint sellers;
        uint sales;
        uint paid;
        uint balance;
    }

    address public owner;
    ShopStats public stats;
    uint public fee;
    ProductStruct[] products;
    mapping(address => ProductStruct[]) productsOf;
    mapping(address => OrderStruct[]) purchaseOf;
    mapping(address => OrderStruct[]) salesOf;
    mapping(address => ShopStats) statsOf;
    mapping(uint => BuyerStruct[]) buyersOf;
    mapping(uint => bool) productExist;
    mapping(address => mapping(uint => bool)) ordersExist;

    event Sale(
        uint256 id,
        address indexed buyer,
        address indexed seller,
        uint256 price,
        uint256 timestamp
    );

    constructor(uint _fee) {
        owner = msg.sender;
        fee = _fee;
    }

    function createProduct(
        string memory sku,
        string memory name,
        string memory description,
        string memory imageURL,
        uint price,
        uint stock
    ) public payable returns (bool) {
        require(msg.value >= fee, "Insufficient fund");
        require(bytes(sku).length > 0, "sku cannot be empty");
        require(bytes(name).length > 0, "name cannot be empty");
        require(bytes(description).length > 0, "description cannot be empty");
        require(bytes(imageURL).length > 0, "image URL cannot be empty");
        require(price > 0, "price cannot be zero");
        require(stock > 0, "stock cannot be zero");

        productExist[stats.products] = true;
        statsOf[msg.sender].products++;
        ProductStruct memory product;

        product.id = stats.products++;
        product.sku = sku;
        product.seller = msg.sender;
        product.name = name;
        product.imageURL = imageURL;
        product.description = description;
        product.price = price;
        product.stock = stock;
        product.timestamp = block.timestamp;

        products.push(product);
        return true;
    }

    function updateProduct(
        uint id,
        string memory name,
        string memory description,
        string memory imageURL,
        uint price,
        uint stock
    ) public returns (bool) {
        require(products[id].seller == msg.sender, "Unauthorize Personel");
        require(bytes(name).length > 0, "name cannot be empty");
        require(bytes(description).length > 0, "description cannot be empty");
        require(price > 0, "price cannot be zero");
        require(stock > 0, "stock cannot be zero");

        ProductStruct memory product;
        product.seller = msg.sender;
        product.name = name;
        product.imageURL = imageURL;
        product.description = description;
        product.price = price;
        product.stock = stock;

        products[id] = product;

        return true;
    }

    function deleteProduct(uint id) public returns (bool) {
        require(products[id].seller == msg.sender, "Unauthorize Personel");
        products[id].deleted = true;
        return true;
    }

    function getProduct(uint id) public view returns (ProductStruct memory) {
        require(productExist[id], "Product not found");
        return products[id];
    }
    
    function getProducts() public view returns (ProductStruct[] memory) {
        return products;
    }

    function createOrder(
        uint[] memory ids,
        uint[] memory qtys,
        string memory destination,
        string memory phone
    ) public payable returns (bool) {
        require(msg.value >= totalCost(ids, qtys), "Insufficient amount");
        require(bytes(destination).length > 0, "destination cannot be empty");
        require(bytes(phone).length > 0, "phone cannot be empty");
    
        stats.balance += totalCost(ids, qtys);

        for(uint i = 0; i < ids.length; i++) {
            if(productExist[ids[i]] && products[ids[i]].stock >= qtys[i]) {
                products[ids[i]].stock -= qtys[i];
                ordersExist[products[ids[i]].seller][statsOf[msg.sender].orders] = true;
                statsOf[msg.sender].orders++;

                OrderStruct memory order;
                order.id = stats.orders++;
                order.sku = products[ids[i]].sku;
                order.buyer = msg.sender;
                order.seller = products[ids[i]].seller;
                order.name = products[ids[i]].name;
                order.imageURL = products[ids[i]].imageURL;
                order.qty = qtys[i];
                order.total = qtys[i] * products[ids[i]].price;
                order.timestamp = block.timestamp;
                order.destination = destination;
                order.phone = phone;

                purchaseOf[order.buyer].push(order);
                salesOf[order.seller].push(order);
                buyersOf[ids[i]].push(
                    BuyerStruct(
                        order.buyer,
                        order.total / order.qty,
                        order.qty,
                        block.timestamp
                    )
                );

                emit Sale(
                    order.id,
                    order.buyer,
                    order.seller,
                    order.total,
                    block.timestamp
                );
            }
        }

        return true;
    }

    function totalCost(uint[] memory ids, uint[] memory qtys) internal view returns (uint) {
        uint total;
        for(uint i = 0; i < ids.length; i++) {
            total += products[i].price * qtys[i];
        }
        return total;
    }

    function markOrderAs(uint id, OrderEnum status) public returns (bool) {
        require(ordersExist[msg.sender][id], "Order not found");

        for(uint i = 0; i < salesOf[msg.sender].length; i++) {
            if(salesOf[msg.sender][i].id == id) {
                salesOf[msg.sender][i].status = status;
                purchaseOf[salesOf[msg.sender][i].buyer][i].status = status;

                if(status == OrderEnum.DELEVIRED) {
                    payTo(
                        salesOf[msg.sender][i].seller,
                        salesOf[msg.sender][i].total
                    );

                    stats.balance -= salesOf[msg.sender][i].total;

                    buyersOf[id].push(
                        BuyerStruct(
                            salesOf[msg.sender][i].buyer,
                            salesOf[msg.sender][i].total,
                            salesOf[msg.sender][i].qty,
                            block.timestamp
                        )
                    );
                }
            }
        }

        for(uint i = 0; i < purchaseOf[msg.sender].length; i++) {
            if(purchaseOf[msg.sender][i].id == id) {
                purchaseOf[msg.sender][i].status = status;
            }else {
                revert("Buyer: Order not found with provided Id");
            }
        }

        return true;
    }

    function cancelOrder(uint id) public returns (bool) {
        require(productExist[id], "Product not found");
        require(purchaseOf[msg.sender][id].buyer == msg.sender, "Unauthorized Personnel");
        require(purchaseOf[msg.sender][id].status < OrderEnum.DELEVIRED, "Order delivered already!");

        purchaseOf[msg.sender][id].status = OrderEnum.CANCELED;
        salesOf[purchaseOf[msg.sender][id].seller][id].status = OrderEnum.CANCELED;

        if(purchaseOf[msg.sender][id].status == OrderEnum.CANCELED) {
            products[id].stock += purchaseOf[msg.sender][id].qty;
            payTo(
                purchaseOf[msg.sender][id].buyer,
                purchaseOf[msg.sender][id].total
            );
        }

        return true;
    }

    function getOrder(uint id) public view returns (OrderStruct memory order) {
        for(uint i = 0; i < purchaseOf[msg.sender].length; i++) {
            if(purchaseOf[msg.sender][i].id == id)
                return purchaseOf[msg.sender][i];
        }
    }
    
    function getOrders() public view returns (OrderStruct[] memory) {
        return purchaseOf[msg.sender];
    }

    function getSale(uint id) public view returns (OrderStruct memory order) {
        for(uint i = 0; i < salesOf[msg.sender].length; i++) {
            if(salesOf[msg.sender][i].id == id)
                return salesOf[msg.sender][i];
        }
    }

    function getSales() public view returns (OrderStruct[] memory) {
        return salesOf[msg.sender];
    }

    function getBuyers(uint id) public view returns (BuyerStruct[] memory buyers) {
        require(productExist[id], "Product does not exist");
        return buyersOf[id];
    }

    function payTo(address to, uint256 amount) internal {
        (bool success1, ) = payable(to).call{value: amount}("");
        require(success1);
    }
}