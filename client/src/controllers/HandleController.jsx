export class HandleFunctions {
  async handleUpdate(id, product, updateProduct) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/updateproduct/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
          credentials: "include",
        },
      );
      if (response.ok) {
        updateProduct(product);
        return alert("Producto actualizado con éxito");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }

  async handleEliminar(id, products, setProducts) {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        const updatedProducts = products.filter(
          (producto) => producto._id !== id,
        );
        setProducts(updatedProducts);
        console.log("Producto eliminado con ID:", id);
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }
}