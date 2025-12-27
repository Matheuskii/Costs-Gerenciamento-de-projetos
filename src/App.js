import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import EditProject from './components/pages/EditProject';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Projects from './components/pages/Projects';

function App() {
  return (
    <Router>
      <Navbar />

      {/* Main Content Area */}
      <Container>
        {/* Routes configuration */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/company' element={<Company />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/newproject' element={<NewProject />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/:id' element={<EditProject />} />

        </Routes>
      </Container>
      <Footer />
      <ToastContainer autoClose={3000} position="top-right"
        toastStyle={{ backgroundColor: "#222", color: "#ffbb33" }}
        progressStyle={{ backgroundColor: "#ffbb33" }}
        theme="dark"
      />
    </Router>
  );
}

export default App;
