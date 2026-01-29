export default function Loader() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
    </div>
  );
}
if (loading) return <Loader />;