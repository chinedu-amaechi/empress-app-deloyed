import ProductCard from "@/components/product/product-card";
import Heading from "@/components/ui/heading";

function CollectionProduct({ collection, products }) {
  return (
    <section id="products-section" className="mb-32">
      <div className="text-center mb-16">
        <Heading
          level={1}
          className="text-2xl md:text-3xl text-gray-900 font-light tracking-tight mb-4"
        >
          Explore the <span className="font-semibold">{collection.name}</span>{" "}
          Collection
        </Heading>

        <div className="w-16 h-px bg-[#11296B]/30 mx-auto my-6"></div>

        <p className="max-w-2xl mx-auto text-gray-600">
          Each piece in this collection has been meticulously crafted to embody
          the essence of timeless elegance and contemporary sophistication.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CollectionProduct;
