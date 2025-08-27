import Image from "next/image";

export const revalidate = 600; // ISR (refresh every 60s)

async function getProduct(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductDetailPage({ params }) {
      const { id } = await params;

  const product = await getProduct(id);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex flex-col gap-4">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-xl object-cover shadow-md"
          />
          <div className="flex gap-2 overflow-x-auto">
            {product.images?.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`${product.title} ${i}`}
                width={100}
                height={100}
                className="rounded-md border object-cover"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
            <span className="text-yellow-500">⭐ {product.rating}</span>
          </div>

          <p className="mb-2">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Stock:</span>{" "}
            {product.stock > 0 ? "✅ In Stock" : "❌ Out of Stock"}
          </p>

          <p className="mb-2">
            <span className="font-semibold">Warranty:</span>{" "}
            {product.warrantyInformation}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Shipping:</span>{" "}
            {product.shippingInformation}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Return Policy:</span>{" "}
            {product.returnPolicy}
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {product.reviews?.length > 0 ? (
            product.reviews.map((review, i) => (
              <div
                key={i}
                className="border p-4 rounded-lg shadow-sm bg-gray-50"
              >
                <p className="text-yellow-500">⭐ {review.rating}</p>
                <p className="text-gray-800">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  – {review.reviewerName}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>

      <div className="mt-8 p-4 border rounded-lg text-black bg-white shadow-sm">
        <h3 className="text-lg  font-semibold mb-2">Product Info</h3>
        <p>
          <span className="font-semibold">SKU:</span> {product.sku}
        </p>
        <p>
          <span className="font-semibold">Barcode:</span>{" "}
          {product.meta?.barcode}
        </p>
        <p>
          <span className="font-semibold">Minimum Order:</span>{" "}
          {product.minimumOrderQuantity}
        </p>
        <div className="mt-2 ">
          <Image
            src={product.meta?.qrCode}
            alt="QR Code"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
