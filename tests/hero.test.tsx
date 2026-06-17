import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/sections/hero';

describe('Hero', () => {
  it('renders the name and positioning', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { name: /simon aytes/i })).toBeInTheDocument();
    expect(screen.getByText('AI & Forward-Deployed Engineering')).toBeInTheDocument();
  });

  it('exposes a resume download link', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /resume/i });
    expect(link).toHaveAttribute('href', '/files/simon-aytes-resume.pdf');
  });

  it('renders the portrait with descriptive alt text', () => {
    render(<Hero />);
    expect(screen.getByAltText(/portrait of simon aytes/i)).toBeInTheDocument();
  });
});
