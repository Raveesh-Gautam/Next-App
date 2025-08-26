import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products Page</h1>
      <p className="mb-4">This is the products page. Select a product below:</p>
      <ul className="space-y-2">
        {Array.from({ length: 10 }, (_, i) => (
          <li key={i + 1}>
            <Link
              href={`/products/${i + 1}`}
              className="text-blue-600 hover:underline"
            >
              Product {i + 1}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
