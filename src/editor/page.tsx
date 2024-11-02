"use client";
import React, { useState, useEffect, useCallback } from "react";
import AsymmetricalBrutalistEditor from "./check";
import NavBar from "../../components/NavBar";
import useTheme from "../../store/useTheme";
import useField from "../../store/useField";
import BentoDark from "../../skeleton/bentoDark/page";
import BentoLight from "../../skeleton/bentoLight/page";
import WindowLight from "../../skeleton/windowLight/page";
import WindowDark from "../../skeleton/windowDark/page";
import ClassicBrut from "../../skeleton/classicBrut/page";
import ClassicLight from "../../skeleton/classicLight/page";
import ClassicDark from "../../skeleton/classicDark/page";
import { useLocation, useNavigate } from "react-router-dom";

export default function SplitScreen() {
  const [splitPosition, setSplitPosition] = useState(75);
  const [isDragging, setIsDragging] = useState(false);
  const [leftWidth, setLeftWidth] = useState(0);
  const [rightWidth, setRightWidth] = useState(0);
  const name = useField((state) => state.name);
  const description = useField((state) => state.description);
  const image = useField((state) => state.image);
  const social = useField((state) => state.social);
  const theme = useTheme((state) => state.theme);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const _theme = queryParams.get("theme");
  const router = useNavigate();
  useEffect(() => {
    if (!theme || theme === null) {
      router("/theme");
    }
    if (_theme && _theme !== theme) {
      router(`/theme`);
    }
  }, [theme]);
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = (e.clientX / window.innerWidth) * 100;
        setSplitPosition(newPosition);
      }
    },
    [isDragging]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const updateWidths = () => {
      const leftEl = document.getElementById("left-panel");
      const rightEl = document.getElementById("right-panel");
      if (leftEl) setLeftWidth(leftEl.offsetWidth);
      if (rightEl) setRightWidth(rightEl.offsetWidth);
    };
    updateWidths();
    window.addEventListener("resize", updateWidths);
    return () => window.removeEventListener("resize", updateWidths);
  }, [splitPosition]);

  return (
    <>
      <NavBar text="Editor" />
      {theme ? (
        <div className="flex h-screen">
          <div
            id="left-panel"
            className="bg-gray-100 overflow-auto"
            style={{ width: `${splitPosition}%` }}
          >
            {theme === "bentoDark" ? (
              <BentoDark {...{ name, description, image, social }} />
            ) : theme === "bentoLight" ? (
              <BentoLight {...{ name, description, image, social }} />
            ) : theme === "windowLight" ? (
              <WindowLight {...{ name, description, image, social }} />
            ) : theme === "windowDark" ? (
              <WindowDark {...{ name, description, image, social }} />
            ) : theme === "classicBrut" ? (
              <ClassicBrut {...{ name, description, image, social }} />
            ) : theme === "classicLight" ? (
              <ClassicLight {...{ name, description, image, social }} />
            ) : theme === "classicDark" ? (
              <ClassicDark {...{ name, description, image, social }} />
            ) : null}
          </div>
          <div
            className="w-1 bg-gray-300 cursor-col-resize"
            onMouseDown={handleMouseDown}
          ></div>
          <div
            id="right-panel"
            className="bg-gray-200 overflow-auto"
            style={{ width: `${100 - splitPosition}%` }}
          >
            <AsymmetricalBrutalistEditor />
          </div>
        </div>
      ) : null}
    </>
  );
}
