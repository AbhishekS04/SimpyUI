
import React from "react";
import { motion } from "framer-motion";

export interface OrbitPlanet {
  icon?: React.ReactNode;
  image?: string;
  color?: string;
  size: number;
  orbit: number;
  speed: number;
  label?: string;
}

export interface OrbitProps {
  size?: number;
  planets?: OrbitPlanet[];
  centerImage?: string;
  centerSize?: number;
}

export const Orbit: React.FC<OrbitProps> = ({
  size = 400,
  planets = [],
  centerImage,
  centerSize = 80,
}) => {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Orbits */}
      {planets.map((planet, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-white/20"
          style={{
            width: planet.orbit * 2,
            height: planet.orbit * 2,
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
      {/* Center (Earth) */}
      {centerImage && (
        <img
          src={centerImage}
          alt="center"
          className="absolute rounded-full shadow-lg object-cover"
          style={{
            width: centerSize,
            height: centerSize,
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%)`,
            background: "#fff",
          }}
        />
      )}
      {/* Planets */}
      {planets.map((planet, i) => {
        // Each planet gets a unique starting angle, and rotates smoothly
        const angle = (360 / planets.length) * i;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: 0,
              height: 0,
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%)`,
              transformOrigin: `50% 50%`,
            }}
            animate={{ rotate: [angle, angle + 360] }}
            initial={{ rotate: angle }}
            transition={{ repeat: Infinity, ease: "linear", duration: planet.speed }}
          >
            <div
              className="flex items-center justify-center bg-white rounded-full shadow-lg"
              style={{
                width: planet.size,
                height: planet.size,
                position: "absolute",
                left: `calc(0px + ${planet.orbit}px - ${planet.size / 2}px)`,
                top: `calc(-${planet.size / 2}px)`,
              }}
            >
              {planet.image ? (
                <img
                  src={planet.image}
                  alt={planet.label || "planet"}
                  className="object-cover rounded-full"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : planet.icon ? (
                planet.icon
              ) : null}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Orbit;
