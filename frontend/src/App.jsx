import { Route, Routes } from "react-router-dom"

import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import toast from "react-hot-toast";
import Navbar from "./components/Navbar";
const App=() => {
 return (
  <div data-theme="forest">
   <Navbar />
    {/* <button className="btn btn-outline">CLICK ME</button>
    <button className="btn btn-neutral">Neutral</button>
    <button className="btn btn-primary">Primary</button>
    <button className="btn btn-secondary">Secondary</button>
    <button className="btn btn-accent">Accent</button>
    <button className="btn btn-info">Info</button>
    <button className="btn btn-success">Success</button>
    <button className="btn btn-warning">Warning</button>
    <button className="btn btn-error">Error</button> */}


    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/notes/:id" element={<NoteDetailPage />} />
    </Routes>
   </div>
 );
};
export default App;