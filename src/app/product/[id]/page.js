
export default async function ProductDetailsPage({ params }) {
  const { id } = await params; 

  return (
    <div className="p-6 border-2 border-gray-400 rounded-lg max-w-md mx-auto mt-10 text-center shadow-md">
      <h1 className="text-xl font-bold mb-4">Product {id} details page</h1>
      <p className="text-gray-600">— content coming soon! —</p>
    </div>
  );
}
