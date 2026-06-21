import { Link } from 'react-router-dom';

function SimplePage({ title, description }) {
  return (
    <main className="flex min-h-screen px-4 pt-20">
      <div className="m-auto max-w-xl text-center">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="mt-3 text-gray-600">{description}</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-black px-4 py-2 text-white">Home</Link>
      </div>
    </main>
  );
}

export default SimplePage;
