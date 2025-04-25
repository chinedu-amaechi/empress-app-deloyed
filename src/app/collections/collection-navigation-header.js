function CollectionNavigationHeader({
  collectionsData,
  activeCollection,
  isScrolled,
  onHandleCollectionChange,
}) {
  return (
    <div className="flex justify-end">
      <div
        className={`backdrop-blur-md rounded-full px-2 py-1 inline-flex transition-all duration-500 ${
          isScrolled
            ? "bg-gray-100 border border-gray-300 shadow-sm"
            : "bg-white/10 border border-white/20"
        }`}
      >
        {Object.entries(collectionsData).map(([slug, collection]) => (
          <button
            key={slug}
            onClick={() => onHandleCollectionChange(collection.name)}
            className={`relative px-4 py-2 mx-1 rounded-full whitespace-nowrap transition-all duration-300 text-sm ${
              activeCollection.name === collection.name
                ? isScrolled
                  ? "text-[#11296B] bg-amber-300 font-medium shadow-sm"
                  : "text-white bg-gray-500/50 font-medium"
                : isScrolled
                ? "text-gray-800 hover:text-[#11296B] hover:bg-gray-200"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            {collection.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CollectionNavigationHeader;
