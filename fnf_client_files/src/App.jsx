import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home"
import Playy from "./Pages/Playy";
import About from "./Pages/About";
import Events from "./Pages/Events";
import Activities from "./Pages/Activities";
import Contact from "./Pages/Contact"
import Bowling from "./Pages/Bowling";
import DriftersCars from "./Pages/DriftersCars";
import Zipline from "./Pages/ZiplineRoller";
import Food from "./Pages/Food";
import Birthday from "./Pages/Birthday";
import Corporate from "./Pages/Corporate";
import Floating from "./components/Floating";
import LaserTag from "./Pages/LaserTag";
import ArcadeGames from "./Pages/ArcadeGames";
import SoftplayTrampolineBullride from "./Pages/SoftplayTrampolineBullride";
import PaintballArena from "./Pages/PaintballArena";
import TargetZone from "./Pages/TargetZone";
import SkyCycle from "./Pages/SkyCycle";
import SkyRoller from "./Pages/SkyRoller";
import RockerEjection from "./Pages/RockerEjection";
import GoKart from "./Pages/GoKart";

export default function App() {
  return (
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
 <Route path="/plan" element={<Playy />} />
 <Route path="/about" element={<About/>}/>
 <Route path="/Event" element={<Events/>} />
 <Route path="/all-activities" element={<Activities/>} />
 <Route path="/Contact" element={<Contact/>} />
 <Route path="/bowling" element={<Bowling/>} />
 <Route path="/drifters" element={<DriftersCars/>} />
 <Route path="/zipline-roller" element={<Zipline/>} />
 <Route path="/food" element={<Food/>} />
 <Route path="/birthday" element={<Birthday/>} />
 <Route path="/corporate" element={<Corporate/>} />
 <Route path="/lasertag" element={<LaserTag/>} />
 <Route path="/arcade-games" element={<ArcadeGames/>} />
 <Route path="/softplay-trampoline-bullride" element={<SoftplayTrampolineBullride/>} />
 <Route path="/paintball-arena" element={<PaintballArena/>} />
  <Route path="/target-zone" element={<TargetZone/>} />
  <Route path ="/sky-cycle" element={<SkyCycle/>} />
  <Route path="/sky-roller" element={<SkyRoller/>} />
  <Route path="/rocket-ejection" element={<RockerEjection/>} />
  <Route path="/go-kart" element={<GoKart/>} />

      </Routes>
    <Floating/>
    </BrowserRouter>
  );
}
