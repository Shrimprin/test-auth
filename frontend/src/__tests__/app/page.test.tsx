import Page from '@/app/page';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SamplePage', () => {
  it('renders the Sample Page heading', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: { username: 'admin' },
      },
    });
    render(<Page />);
    const heading = screen.getByText(/Create Repository/i);
    expect(heading).toBeInTheDocument();
  });
});
