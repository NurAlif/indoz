import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import Footer from './components/layout/Footer';
import AIChatContainer from './components/ai-chat/AIChatContainer';

// Placeholder pages - other agents will build these
const AIChat = () => <AIChatContainer />;
import JobSearchContainer from './components/jobs/JobSearchContainer';
import ResumeCheckerContainer from './components/resume/ResumeCheckerContainer';
import GuidesContainer from './components/guides/GuidesContainer';
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
            <Route path="/jobs" element={<div className="pt-16"><JobSearchContainer /></div>} />
            <Route path="/resume" element={<ResumeChecker />} />
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
