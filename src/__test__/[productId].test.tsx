import { useProductDetail } from "@/hooks/productHooks/useProductDetail";
import { IProduct } from "@/interfaces";
import {
  fireEvent,
  render,
  renderHook,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetail from "../pages/category/[categoryId]/product/[productId]";
//import {jest} from '@jest/globals';

// creates a mock router for NextJS
jest.mock("next/router", () => {
  return {
    useRouter: () => ({
      query: { productId: "1" },
    }),
  };
});

// mock router for axios to simulate data fetching
jest.mock("axios");

describe("ProductDetail", () => {

  // creates a mock product for testing purposes
  let mockProduct: IProduct = {
    id: 1,
    title: "Product 1",
    price: "9.99",
    category: "electronics",
    description: "description",
    image: "",
  };
  let mockRouter;

  // initialize router with query params and fetch data
  beforeEach(() => {
    mockRouter = {
      query: { id: 1 },
      push: jest.fn(),
    };
    (axios.get as jest.Mock).mockResolvedValue({ data: mockProduct });
  });

  // clean up function
  afterEach(() => {
    (axios.get as jest.Mock).mockClear();
  });

  it("counter displays correct data on initial", async () => {
    const queryClient = new QueryClient();
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ProductDetail />
      </QueryClientProvider>
    );

    await waitFor(() => expect(getByTestId("count").textContent).toBe("1"));
  });

  it("counter displays correct data on increment", async () => {
    const queryClient = new QueryClient();
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ProductDetail />
      </QueryClientProvider>
    );

    await waitFor(() => {
      fireEvent.click(getByTestId("increment"));
      expect(getByTestId("count").textContent).toBe("2");
    });
  });

  it("counter displays correct data on decrement", async () => {
    const queryClient = new QueryClient();
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ProductDetail />
      </QueryClientProvider>
    );
    await waitFor(() => {
      fireEvent.click(getByTestId("decrement"));
      expect(getByTestId("count").textContent).toBe("1");
    });
  });

  it("axios api calls 3 times", async () => {
    const queryClient = new QueryClient();
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ProductDetail />
      </QueryClientProvider>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3));
  });

  it("description displays correct label", async () => {
    const queryClient = new QueryClient();
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ProductDetail />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(getByTestId("description").textContent).toBe("description");
    });
  });

  it("price displays correct label", async () => {
    const queryClient = new QueryClient();
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ProductDetail />
      </QueryClientProvider>
    );
    await waitFor(() => {
      const content = `$${mockProduct.price} or $${(
        parseInt(mockProduct.price) / 6
      ).toFixed(2)}/month`;
      expect(getByTestId("price").textContent).toBe(content);
    });
  });

  it("should return the correct data from query hook", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useProductDetail("1"), { wrapper });
    await waitFor(() => {
      expect(result.current.data).toEqual(mockProduct);
    });
  });
});


