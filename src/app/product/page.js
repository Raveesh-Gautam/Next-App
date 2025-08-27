import Link from "next/link";
import Image from "next/image";

// ISR (Incremental Static Regeneration) → rebuild every 60 seconds
export const revalidate = 60;

async function getProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=12", {
    next: { revalidate: 60 }, // cache + revalidate
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-2xl shadow-md overflow-hidden bg-white hover:shadow-lg transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-black mb-2 truncate">
                {product.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-green-600">
                  ${product.price}
                </span>
                <span className="text-yellow-500 text-sm">
                  ⭐ {product.rating}
                </span>
              </div>
              <p
                className={`text-sm mb-3 ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.availabilityStatus || "Out of stock"}
              </p>
              <Link
                href={`/product/${product.id}`}
                className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
