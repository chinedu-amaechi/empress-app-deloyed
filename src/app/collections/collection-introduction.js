import Heading from "@/components/ui/heading";

function CollectionIntroduction({ collection }) {
   // Calculate total number of ratings (reviews) for the collection.
  const totalRatings = collection.products.reduce(
    (total, product) => total + (product.ratings ? product.ratings.length : 0),
    0
  );
  return (
    <div className="flex flex-col items-center text-center mb-24">
      <div className="w-16 h-16 rounded-full bg-[#11296B]/10 flex items-center justify-center mb-8">
        <svg
          className="w-8 h-8 text-[#11296B]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </div>

      <Heading
        level={1}
        className="text-3xl md:text-4xl text-gray-900 font-light tracking-tight mb-6"
      >
        The Essence of <span className="font-semibold">{collection.name}</span>
      </Heading>

      <div className="w-16 h-px bg-[#11296B]/30 my-6"></div>

      <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed mb-8">
        Each piece in the {collection.name} collection tells a unique story,
        crafted with meticulous attention to detail and using only the finest
        materials. Our artisans blend traditional techniques with contemporary
        design to create timeless pieces that resonate with the modern empress.
      </p>

      {/* Collection Stats in Elegant Layout */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-16 mt-12">
        <div className="text-center">
          <div className="text-4xl font-light text-[#11296B] mb-2">
            {collection.products.length}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-widest">
            Unique Pieces
          </div>
        </div>
        {/* <div className="text-center">
          <div className="text-4xl font-light text-[#11296B] mb-2">
            {totalRatings}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-widest">
            Customer Reviews
          </div>
        </div> */}
        <div className="text-center">
          <div className="text-4xl font-light text-[#11296B] mb-2">100%</div>
          <div className="text-xs text-gray-500 uppercase tracking-widest">
            Handcrafted
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionIntroduction;
