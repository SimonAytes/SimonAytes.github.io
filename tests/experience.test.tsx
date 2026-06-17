import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Experience } from '@/components/sections/experience';
import { experience } from '@/data/experience';

describe('Experience', () => {
  it('renders one disclosure per company', () => {
    const { container } = render(<Experience />);
    expect(container.querySelectorAll('details').length).toBe(experience.length);
  });

  it('exposes each company name and its narrative', () => {
    render(<Experience />);
    expect(screen.getAllByText(/wall street journal/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/journo-tech/i)).toBeInTheDocument();
  });
});
