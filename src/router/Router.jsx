import React from "react";
import { HashRouter, Outlet, Route, Routes } from "react-router-dom";
import ResponsiveDrawer from "../pages/SiderBar/SiderBar";
import HotMap from "../pages/hotmap/HotMap";
import FlowMap from "../pages/flowmap/FlowMap";
import RankListPage from "../pages/ranklist/RankListPage";
import Freque from "../pages/frequency/Freque";
import Home from "../pages/overall/Home";
export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="/" element={<Home />} />
          <Route path="总览" element={<Home />} />
          <Route path="频次分布" element={<Freque />} />
          <Route path="排行榜" element={<RankListPage />} />
          <Route path="热力图" element={<HotMap />} />
          <Route path="列车趋势" element={<FlowMap />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

const Index = () => {
  return (
    <ResponsiveDrawer>
      <Outlet />
    </ResponsiveDrawer>
  );
};
