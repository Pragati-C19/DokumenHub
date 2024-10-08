// 5 Recent Documents Component

"use client"; // Add this directive to make it a Client Component

import Link from 'next/link';

export default function RecentDocs() {

  return (
    <div>
      {/* Recent Pages Section Placeholder */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Recent Documents</h2>
        {/* Grid and List view will come here */}
        <p className='flex justify-center'>Not Visited Any Documents Yet.</p>
      </div>
    </div>
  );
}