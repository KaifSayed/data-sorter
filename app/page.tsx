import { DataTable } from '../components/DataTable';
import { ThemeToggle } from '../components/ThemeToggle';
import { User } from '../types';
import { generateUsers } from '../lib/generateData';

// Fetch seed users from the API, then expand to 500
async function getUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to load user dataset.');
  }

  const seedUsers = await res.json();
  return generateUsers(seedUsers, 500);
}

export default async function Home() {
  try {
    const data = await getUsers();

    return (
      <main style={{ minHeight: '100vh', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Page Header */}
          <div className="page-header" style={{ marginBottom: 24 }}>
            <div>
              <h1 className="page-title">Team Directory</h1>
              <p className="page-subtitle">
                500 users · Sortable, filterable, and paginated data display
              </p>
            </div>
            <ThemeToggle />
          </div>

          {/* Data Table */}
          <DataTable data={data} />
        </div>
      </main>
    );
  } catch {
    return (
      <div className="error-container">
        <div className="error-card">
          <p className="error-title">System Error</p>
          <p className="error-desc">
            Unable to load the interface configurations at this time.
          </p>
        </div>
      </div>
    );
  }
}
