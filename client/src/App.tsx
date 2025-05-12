import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NewsletterForm } from './components/NewsletterForm';
import { AdminDashboard} from './components/AdminDashboard';
import Nav from './components/Nav';

function App() {
  return (
  <Router>
  <Nav />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
        <Routes>
          <Route path="/" element={<NewsletterForm />} />
          <Route path="/admin/subscribers" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
