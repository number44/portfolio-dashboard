import "./app.scss";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";
interface PropsI {}
const App = ({}: PropsI) => {
    return (
        <div className="dark">
            <BrowserRouter>
                <Navbar />
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
