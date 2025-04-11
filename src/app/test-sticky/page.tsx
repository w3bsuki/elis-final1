import React from 'react';

export default function TestStickyPage() {
  return (
    <div className="min-h-[2000px] pt-20">
      <h1 className="text-4xl font-bold mb-4 mt-20">Test Sticky Header</h1>
      <p className="mb-4">Scroll down to test if the header stays fixed at the top.</p>
      
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="mb-8 p-4 border rounded">
          <h2 className="text-2xl font-bold mb-2">Section {i+1}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, 
            nisl eget fermentum ultricies, nunc nisl ultricies nunc, quis ultricies
            nisl nisl eget fermentum ultricies, nunc nisl ultricies nunc, quis ultricies.
          </p>
        </div>
      ))}
    </div>
  );
} 