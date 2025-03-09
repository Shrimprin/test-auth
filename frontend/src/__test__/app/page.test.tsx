import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

const mockFn = jest.fn();
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: () => {
    return { push: mockFn };
  },
}));

describe("TopPage", () => {
  beforeEach(() => {
    console.log(mockFn);
    mockFn.mockClear();
  });

  it("タイトルが表示されている", () => {
    render(<Home />);
    const title = screen.getByRole("heading", { name: "Create Repository" });
    expect(title).toBeInTheDocument();
  });
});
