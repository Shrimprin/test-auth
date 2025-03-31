import RepositoryForm from '@/components/repository-form';
import axios from 'axios';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RepositoryForm', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          accessToken: 'mockAccessToken',
        },
      },
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: 123,
        name: 'test-repo',
      },
    });
  });

  it('renders the form', () => {
    render(<RepositoryForm />);
    expect(screen.getByText(/Create Repository/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter repository URL/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create/i })).toBeInTheDocument();
  });

  it('validates input and shows error message', async () => {
    render(<RepositoryForm />);
    const submitButton = screen.getByRole('button', { name: /Create/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/有効なURLを入力してください/i),
      ).toBeInTheDocument();
    });
  });

  it('submits form with valid URL and navigates to new page', async () => {
    render(<RepositoryForm />);
    const input = screen.getByPlaceholderText(/Enter repository URL/i);
    const submitButton = screen.getByRole('button', { name: /Create/i });

    fireEvent.change(input, {
      target: { value: 'https://github.com/user/repo' },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/repositories`,
        { repository: { url: 'https://github.com/user/repo' } },
        {
          headers: {
            Authorization: 'Bearer mockAccessToken',
            'Content-Type': 'application/json',
          },
        },
      );
      expect(pushMock).toHaveBeenCalledWith('/repositories/123');
    });
  });
});
