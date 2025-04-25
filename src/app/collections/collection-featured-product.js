import Image from "next/image";

function CollectionFeaturedProduct({ collection }) {
  // Check if featuredProduct exists and has valid image data
  const hasValidImage =
    collection?.featuredProduct?.imagesUrl?.[0]?.optimizeUrl;
  const productName = collection?.featuredProduct?.name || "Featured Product";
  const productDescription =
    collection?.featuredProduct?.description || "No description available";
  const productMaterials = collection?.featuredProduct?.materials || [];

  // Use a placeholder image if no valid image URL is available
  const imageUrl = hasValidImage
    ? collection.featuredProduct.imagesUrl[0].optimizeUrl
    : "/product/product-placeholder.jpg";

  return (
    <div className="relative mb-32 border-1 border-[#d4d4d4] rounded-3xl overflow-hidden">
      <div className="absolute -inset-4 bg-[#11296B]/5 rounded-3xl -z-10 transform -rotate-1"></div>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Image Side */}
          <div className="relative h-80 lg:h-auto lg:min-h-[600px] overflow-hidden">
            <Image
              src={imageUrl}
              alt={productName}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full">
              <span className="text-sm text-[#11296B] font-medium">
                Featured Piece
              </span>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center p-10 lg:p-16">
            <h3 className="text-3xl font-light text-gray-900 mb-4">
              {productName}
            </h3>

            <div className="w-12 h-px bg-[#11296B]/30 my-6"></div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {productDescription}
              {/* Extended description */}
              <span className="block mt-4">
                Designed to embody the essence of the {collection.name}{" "}
                collection, this piece stands as a testament to our commitment
                to exceptional craftsmanship.
              </span>
            </p>

            {/* Product Insights with responsive mobile-first design */}
            <div className="mb-8">
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                Product Insights
              </div>
              <div className="grid grid-cols-1 gap-3">
                {/* First row - 3 columns on tablet and up, stacked on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  {/* Materials */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      Materials
                    </div>
                    <ul>
                      {productMaterials.length > 0 ? (
                        productMaterials.map((material, index) => (
                          <li
                            key={index}
                            className="flex items-center mb-1 font-semibold text-sm"
                          >
                            {material}
                          </li>
                        ))
                      ) : (
                        <li className="flex items-center mb-1 font-semibold text-sm">
                          Premium Materials
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Creation Time */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      Size
                    </div>
                    <div className="text-sm font-medium">*****</div>
                  </div>

                  {/* Sustainability */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      Rating
                    </div>
                    <div className="text-sm font-medium">*****</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionFeaturedProduct;
