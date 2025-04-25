function CartItem({ product }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-2 text-base text-gray-600">Price: ${product.price}</p>
      </div>
      <div className="mt-4 md:mt-0">
        <p className="text-lg text-gray-700">Quantity: {product.quantity}</p>
      </div>
    </div>
  );
}

export default CartItem;
