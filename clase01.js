class Container {
    constructor() {
        this.products = [];
    }

    getById(id) {
        return this.products.find(p => p.id == id) ?? null;
    }

    save(product) {
        if (this.products.some(p => p.id == product.id)) return;
        this.products.push(product);
    }

    getAll() {
        return this.products;
    }

    deleteById(id) {
        let index = this.products.findIndex(p => p.id == id);
        if (index == -1) return;
        this.products.splice(index, index);
    }

    deleteAll() {
        this.products = [];
    }
}


function main() {
    const container = new Container();

    container.save({ id: 1, title: "Producto 1", price: 112, thumbnail: "thumb1.jpg" });
    container.save({ id: 2, title: "Producto 2", price: 922, thumbnail: "thumb2.jpg" });
    container.save({ id: 3, title: "Producto 3", price: 761, thumbnail: "thumb3.jpg" });
    console.log("\n.save():\t\t\tProductos con id 1, 2, 3 agregados");
    console.log(container.getAll());

    console.log("\n.save():\t\t\tIntento de agregar producto con id 3(que ya esta presente)");
    container.save({ id: 3, title: "Producto 3 repetido", price: 980, thumbnail: "thumb0.jpg" });
    console.log(container.getAll());

    console.log("\n.getById(2):\t\tBusqueda del producto con id 2");
    console.log(container.getById(2));

    console.log("\n.getById(999):\t\tBusqueda del producto con id 999");
    console.log(container.getById(999));

    console.log("\n.deleteById(1):\t\tBorrar el producto con id 1");
    container.deleteById(1);
    console.log(container.getAll());

    console.log("\n.deleteAll():\t\tBorrar todos");
    console.log(container.deleteAll());
    console.log(container.getAll());

}


main();

