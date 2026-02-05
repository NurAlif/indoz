import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import Footer from './components/layout/Footer';
import ResumeCheckerContainer from './components/resume/ResumeCheckerContainer';
import GuidesContainer from './components/guides/GuidesContainer';

// Placeholder pages - other agents will build these
const AIChat = () => <div className="pt-20 px-4">AI Chat - Agent 04 will build this</div>;
const JobSearch = () => <div className="pt-20 px-4">Cari Lowongan - Agent 05 will build this</div>;
const Guides = () => <div className="pt-20 px-4">Panduan Lengkap - Agent 07 will build this</div>;
const ResumeChecker = () => <div className="pt-20 px-4">Cek Resume - Agent 06 will build this</div>;
const Guides = () => <div className="pt-20"><GuidesContainer /></div>;
const Login = () => <div className="pt-20 px-4">Login Page</div>;

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <TopBar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<AIChat />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route
              path="/resume"
              element={
                <div className="pt-20">
                  <ResumeCheckerContainer />
                </div>
              }
            />
            <Route path="/guides" element={<Guides />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
