import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './components/common/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ProductsPage from './pages/ProductsPage';
import AdminDashboard from './pages/AdminDashboard';
import AboutAdmin from './pages/AboutAdmin';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminRoute from './components/AdminRoute';
import chatbotService from './services/chatbotService';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console for debugging
    // eslint-disable-next-line no-console
    console.error('Uncaught error in App:', error, info);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-dark-main text-white">
          <div className="max-w-2xl w-full border border-purple-accent/30 rounded-lg p-6 shadow-lg bg-dark-card">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-2 text-sm text-red-500">{this.state.error?.message}</p>
            <pre className="text-xs bg-dark-main p-3 rounded overflow-auto max-h-48 border border-purple-accent/20 text-text-secondary">{this.state.info?.componentStack}</pre>
            <div className="mt-4">
              <button onClick={() => window.location.reload()} className="px-4 py-2 bg-purple-accent text-white rounded hover:bg-purple-bright transition">Reload</button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  // Load knowledge base on app start
  useEffect(() => {
    try {
      chatbotService.loadKnowledgeBase().catch(err => {
        console.warn('Failed to load KB, using fallback:', err);
      });
    } catch (error) {
      console.warn('KB load error:', error);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen bg-dark-main">

            <Navbar />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/admin/about"
                  element={
                    <AdminRoute>
                      <AboutAdmin />
                    </AdminRoute>
                  }
                />
              </Routes>
            </main>

            <Footer />

            {/* Chatbot Widget */}
            <ChatBot />
          </div>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
}

export default App;
