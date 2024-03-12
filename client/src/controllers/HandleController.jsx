export class HandleFunctions {
  async handleUpdate(id, product, updateProduct, setLoading) {
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
        setLoading(false);
        return alert("Producto actualizado con éxito");
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  }

  async handleEliminar(id, products, setProducts, setDeleteLoading) {
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
        setDeleteLoading(null);
        console.log("Producto eliminado con ID:", id);
      } else {
        console.error("Error al eliminar el producto");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }

  async handleAgregar(formData, addProduct, setAddLoading) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/products/addProduct",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        },
      );
      if (response.ok) {
        const newProduct = await response.json();
        addProduct(newProduct);
        setAddLoading(false);
        return alert("Producto agregado correctamente!");
      }
    } catch (error) {
      console.error("Error al agregar el producto", error);
    }
  }
}
