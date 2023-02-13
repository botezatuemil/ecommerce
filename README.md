# Ecommerce App

An ecommerce app made in Next.js that has functionalities for user login, displaying products, filters, account data and cart.


## Tech Stack

- Next.js
- Zustand library for state management
- react-query for server side management
- Typescript
- Jest for Unit tests
- TailwindCSS and react-icons




## User Interaction

### Home Page

- This page shows a background video that is on loop, along a navbar that changes it's style based on user interaction.
- From the navbar you can navigate to Menu, search from the products displayed, see your account details or use the cart.

![mainPage1](https://user-images.githubusercontent.com/74835450/215292386-74675506-bfd0-426e-baff-5dedee67e085.png)

- The next part on scroll shows a horizontal list of products that are fetched from the api call, a list of hardcoded services for style purposes and also a footer. 
- From the products displayed below, on clicking one of those, the user is redirected to the product detail page, that will be explained later.

![image](https://user-images.githubusercontent.com/74835450/215292606-06a410ad-998c-49eb-9751-55ede420f1c5.png)

### Menu sidebar

- it shows a list of categories that are fetched
- used to navigate to products that coresponds to the category name

![image](https://user-images.githubusercontent.com/74835450/215292779-436e4bba-dbcf-4cfe-960a-d1e6e446ad01.png)

### Search bar

- Used to search through elements that are displayed on screen and show those that coresponds to the typed keyword

![image](https://user-images.githubusercontent.com/74835450/215293091-237444ac-2f90-4615-91d1-b5fd56d6820b.png)

### Filter sidebar
- Used to filter products by category or by price
- Can apply multiple filters at the same time

![image](https://user-images.githubusercontent.com/74835450/215293136-6e34192e-ce01-476a-a713-7ca2e250d5c4.png)

### Product page
- Displays a grid of products along with the coresponding details
- On the bottom of the page, a spinner is loading to show that is fetching more data for infinite scrolling experience

![image](https://user-images.githubusercontent.com/74835450/215293206-fdfdfd24-b47a-467f-a9ba-eb9d0be8e1ee.png)

### Product detail page
- Shows detail for the selected product
- Can select how many products are added to the cart

![image](https://user-images.githubusercontent.com/74835450/215293392-653ba887-292a-44c7-884c-b955b7879ddf.png)


### Product Detail Related Products
- Shows the products from the same category as the selected product without showing the item multiple times
- On See all button, the user is redirected to the current category page

![image](https://user-images.githubusercontent.com/74835450/215293474-e341ccc6-4175-4293-9104-d8032d249ff7.png)

### Cart 
- Shows the current shopping cart 
- Can add or remove products directly from the cart

![image](https://user-images.githubusercontent.com/74835450/215293636-7ca6687b-dab6-4cc7-9a14-518659379a44.png)

### Login Screen 

- Screen used for user authentication

![image](https://user-images.githubusercontent.com/74835450/215293703-b0ac9f37-53e4-4220-a161-6403bea01654.png)

### Handling Bad Data

- Displays error message and style when the credidentials are incorrect
- Also displays error message and style when username input is left empty

![image](https://user-images.githubusercontent.com/74835450/215293920-5a242828-1f0a-483c-ac01-92d0d56f9e71.png)

### Account Page
- Account page to show user data
- Can log out from the app 

![image](https://user-images.githubusercontent.com/74835450/215294038-2e2e392a-e8de-4876-8de1-b1b8efcb8299.png)
## Documentation

### Hooks
The main and the most important logic is handled by different custom hooks that were used thorought the application.

The data fetching is handled by react-query library. It supports many features like caching for avoiding redundant api calls. 

For reusing most of the code and handling filter cases, I wrapped the react query hooks in a separate custom hook component. 

```typescript
export const fetchProducts = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;
};

// fetch products data using useQuery hook from react query library
export const useProduct = (filterPrice? :IPriceRange[], filterCategory?: IFilterCategory[], filterName?: string, limit?: number) => {
  return useQuery<IProduct[]>("products", fetchProducts, {
    onSuccess: () => console.log("Succes"),
    onError: () => console.log("Error"),
    select: (state) => {
      // handling filters
    }
  });
};
```

For example, the **useProduct** hook has 4 optional parameters, that handle all filters at once. The filters are all global state data, from zustand library and are passed when component mounts. Now if any filter is active, the useProduct hook will automatically filter data whenever the global store for filters changes.

```typescript
const { filterPrice, toggleFilterPrice } = useFilterPrice();
const { filterCategory, toggleCategoryFilter } = useCategoryFilter();
const { filterName } = useFilterSearch();
const [limit, setLimit] = useState<number>(8);

const { isLoading, data, isError, isFetching, refetch } = useProduct(
    filterPrice,
    filterCategory,
    filterName,
    limit
  );

```
And update filters logic for price:

```typescript
 const onCheckPrices = ( checkedPrice : IPriceRange) =>  {
    const newData = filterPrice.map(price => price.id === checkedPrice.id ? {...price,  checked :!checkedPrice.checked} : {...price, checked : false} );
    toggleFilterPrice(newData)
  }
```

As a result this allow to reuse all filter logic to other hooks like useProductInCategory that fetches products from the specified category just by passing the filters.

The optional parameters are used when the hook doesn't need to handle the filters, like the products in category, so the filters are not passed. 

### Authentication

The main page is the home screen, so the user can use the app even when it's not logged in. 

To login in the app, press the account button. On the login page, when the user types his credidentials, the **useForm** custom hook handles most of the logic for errors and events. 

If the user credidentials are valid and correct, the token returned from the api call is saved on local storage to be used later in the app to fetch user detail on the account page.

If the data is invalid, an error message is shown on the screen. 

### Fetching data optimization

As was stated before, the useProduct hook has 4 filters, one of them is a limit, used for limiting the products list from the main page. Because the api doesn't have any pagination integrated, I optimized only what is showing on screen by displaying the first 8 products, and then, when the user scrolls to the bottom it displays the next 4 products, until all the products are displayed.

On the bottom of the screen, a spin animation was used, to create a better user experience for infinite scrolling.

### Zustand global store

It was used for handling toggle cases from different screens and most important for cart and filter functionality.

The cart adds support for adding items, removing and calculating the total sum of products. Also it makes possible to refetch data when, the user closes the cart drawer side bar. 


```typescript

interface ICartState {
  items: ICart[];
  addToCart: (cartItem : ICart) => void;
  removeFromCart: (cartItem : ICart) => void;
  getTotalSum : () => number;
}

export const useCartStore = create<ICartState>()((set, get) => ({
  items: [],

  // add a new item to cart if it's not found
  // if it's found just add the quantity at the found cart that is specified as parameter
  addToCart: (cartItem : ICart) =>  {
    const cartItems = get().items;
    let found = cartItems.some((cart) => cart.product.id === cartItem.product.id);
      if (found) {
        set({items: [...cartItems.map(cart => 
          cart.product.id === cartItem.product.id ? {...cart, quantity: cart.quantity + cartItem.quantity} : cart
        )]});
      } else {
        set({items: [...cartItems, cartItem]});
      }
  },

  // remove the product from cart if the current quantity is 1
  // update the quantity by decreasing the quantity of found items with the one specified from parameter
  removeFromCart: (cartItem : ICart) =>  {
    const cartItems = get().items;
    if (cartItem.quantity === 1) {
      set({items: [...cartItems.filter(cart => cart.product.id !== cartItem.product.id)]})
    } else {
      set({items: [...cartItems.map(cart => cart.product.id === cartItem.product.id ? {...cart, quantity: cart.quantity - 1} : cart)]})
    }
  },

  // calculates the total sum of cart items for displaying the final price
  getTotalSum : () => {
    const cartItems = get().items;
    let totalSum = 0;

    cartItems.map(cart => {
      const res =  (parseFloat(cart.product.price) * cart.quantity).toFixed(2)
      totalSum += Number(res);
    })
    return totalSum;
  }
}));
```





## Responsive Design

![image](https://user-images.githubusercontent.com/74835450/215294188-747957ea-8415-4d04-965e-5884eb7bc1dc.png)

![image](https://user-images.githubusercontent.com/74835450/215294300-a5be7168-5630-4372-af88-613893d088f2.png)

![image](https://user-images.githubusercontent.com/74835450/215294325-a7cdeea0-6765-452a-a9ce-b5a81a0abefc.png)

![image](https://user-images.githubusercontent.com/74835450/215294366-e94c139d-133e-4118-b30e-b4a0f94d93a0.png)

![image](https://user-images.githubusercontent.com/74835450/215294383-10ef9dc2-0039-44a9-818e-7e50da7da193.png)

![image](https://user-images.githubusercontent.com/74835450/215294420-facd10aa-039e-41be-b2ac-e93d6af9533d.png)

![image](https://user-images.githubusercontent.com/74835450/215294439-2177bd57-749b-426a-8349-1df09b07979b.png)
## Running Tests

To run tests, run the following command

```bash
  npm run test
```

Unit testing was done using Jest and react-testing library. Testing was done on the ProductDetail page to check various UI and backend behaviour:

- counter works corectly on incrementing, decrementing, initialize
- api is called only one time to avoid redundant api calls
- the data that comes from the api is correct
- the react query hook works as expected and returns the same data as the mock axios


```typescript
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

  it("axios api calls 1 time", async () => {
    const queryClient = new QueryClient();
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ProductDetail />
      </QueryClientProvider>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
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

```


## Run Locally
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


