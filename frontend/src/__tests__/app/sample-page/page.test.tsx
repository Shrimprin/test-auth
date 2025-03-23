import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import SamplePage from '@/app/sample-page/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// これでも可
// const mockFn = jest.fn();
// jest.mock("next/navigation", () => ({
//   ...jest.requireActual("next/navigation"),
//   useRouter: () => {
//     return { push: mockFn };
//   },
// }));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SamplePage', () => {
  it('renders the Sample Page heading', () => {
    render(<SamplePage />);
    const heading = screen.getByText(/Sample Page/i);
    expect(heading).toBeInTheDocument();
  });

  it('navigates to home when button is clicked', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<SamplePage />);
    const button = screen.getByRole('button', { name: /Go to Home/i });
    fireEvent.click(button);

    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('fetches weather data when Fetch Weather button is clicked', async () => {
    const weatherData = { data: { title: 'Weather Data' } };
    mockedAxios.get.mockResolvedValueOnce(weatherData);

    render(<SamplePage />);
    const button = screen.getByRole('button', { name: /Fetch Weather/i });
    fireEvent.click(button);

    // 非同期処理の完了を待つ
    await screen.findByText(/Sample Page/i);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://weather.tsukumijima.net/api/forecast/city/400040',
    );
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });
});
