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
        uint pid;
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
    mapping(uint => OrderStruct[]) ordersOf;
    mapping(address => ShopStats) public statsOf;
    mapping(uint => BuyerStruct[]) buyersOf;
    mapping(uint => bool) public productExist;
    mapping(uint => mapping(uint => bool)) public orderExist;

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
        stats.sellers++;
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
        product.id = id;
        product.seller = msg.sender;
        product.name = name;
        product.imageURL = imageURL;
        product.description = description;
        product.price = price;
        product.stock = stock;

        products[id] = product;
        updateOrderDetails(product);

        return true;
    }

    function updateOrderDetails(ProductStruct memory product) internal {
        for(uint i=0; i < ordersOf[product.id].length; i++) {
            OrderStruct memory order = ordersOf[product.id][i];
            order.name = product.name;
            order.imageURL = product.imageURL;
            ordersOf[product.id][i] = order;
        }
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
                statsOf[msg.sender].orders++;
                stats.orders++;

                OrderStruct memory order;

                order.pid = products[ids[i]].id;
                order.id = ordersOf[order.pid].length; // order Id resolved
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

                ordersOf[order.pid].push(order);
                orderExist[order.pid][order.id] = true;

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

    function deliverOrder(uint pid, uint id) public returns (bool) {
        require(orderExist[pid][id], "Order not found");
        OrderStruct memory order = ordersOf[pid][id];
        require(order.seller == msg.sender, "Unauthorized Entity");
        require(order.status != OrderEnum.DELEVIRED, "Order already delievered");
        
        order.status = OrderEnum.DELEVIRED;
        ordersOf[pid][id] = order;

        stats.balance -= order.total;
        statsOf[order.seller].paid += order.total;
        statsOf[order.seller].sales++;
        stats.sales++;

        payTo(order.seller, order.total);

        buyersOf[id].push(
            BuyerStruct(
                order.buyer,
                order.total,
                order.qty,
                block.timestamp
            )
        );
        return true;
    }

    function cancelOrder(uint pid, uint id) public returns (bool) {
        require(orderExist[pid][id], "Order not found");
        OrderStruct memory order = ordersOf[pid][id];
        require(order.buyer == msg.sender, "Unauthorized Entity");
        require(order.status != OrderEnum.CANCELED, "Order already canceled");

        order.status = OrderEnum.CANCELED;
        products[order.pid].stock += order.qty;
        ordersOf[pid][id] = order;

        payTo(order.buyer, order.total);
        return true;
    }

    function getOrders() public view returns (OrderStruct[] memory props) {
        props = new OrderStruct[](stats.orders);

        for(uint i=0; i < stats.orders; i++) {
            for(uint j=0; j < ordersOf[i].length; j++) {
                props[i] = ordersOf[i][j];
            }
        }
    }

    function getOrder(uint pid, uint id) public view returns (OrderStruct memory) {
        require(orderExist[pid][id], "Order not found");
        return ordersOf[pid][id];
    }

    function getBuyers(uint pid) public view returns (BuyerStruct[] memory buyers) {
        require(productExist[pid], "Product does not exist");
        return buyersOf[pid];
    }

    function payTo(address to, uint256 amount) internal {
        (bool success1, ) = payable(to).call{value: amount}("");
        require(success1);
    }
}