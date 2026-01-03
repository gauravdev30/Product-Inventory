import { Toaster } from 'sonner';
import ProductList from './components/ProductList';

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="container my-4">
        <ProductList />
      </div>
    </>
  );
}

export default App;
