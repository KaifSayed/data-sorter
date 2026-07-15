import { DataTable } from '../components/DataTable';
import { User } from '../types';

// Fetching directly on the Server
async function getUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    // Next.js static generation or ISR options can go here if needed
    next: { revalidate: 3600 } 
  });
  
  if (!res.ok) {
    throw new Error('Failed to load user dataset.');
  }
  
  return res.json();
}

export default async function Home() {
  try {
    const data = await getUsers();

    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Team Directory
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              A dynamic list of structural platform users fetched directly from placeholder services.
            </p>
          </div>

          <DataTable data={data} />
        </div>
      </main>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-red-100">
          <p className="text-red-600 font-semibold text-lg">System Error</p>
          <p className="text-gray-500 mt-1">Unable to load the interface configurations at this time.</p>
        </div>
      </div>
    );
  }
}
