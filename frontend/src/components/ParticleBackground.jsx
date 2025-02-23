// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";

// const ParticleBackground = () => {
//   const particlesInit = async (main) => {
//     await loadFull(main);
//   };

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       options={{
//         background: {
//           opacity: 0
//         },
//         particles: {
//           number: {
//             value: 50,
//             density: {
//               enable: true,
//               value_area: 800
//             }
//           },
//           color: {
//             value: "#4F46E5"
//           },
//           links: {
//             enable: true,
//             color: "#4F46E5",
//             opacity: 0.2
//           },
//           move: {
//             enable: true,
//             speed: 1
//           }
//         }
//       }}
//       className="absolute inset-0"
//     />
//   );
// };


// export default ParticleBackground;

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  // State to track initialization status
  const [init, setInit] = useState(false);

  // Initialize the particles engine once when component mounts
  useEffect(() => {
    // Initialize particles engine with slim bundle
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Optional callback when particles container is loaded
  const particlesLoaded = (container) => {
    console.log("Particles container loaded", container);
  };

  // Particle configuration options using useMemo to prevent unnecessary recalculations
  const options = useMemo(
    () => ({
      // Make background transparent to match your design
      background: {
        opacity: 0
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push"
          },
          onHover: {
            enable: true,
            mode: "repulse"
          },
          resize: true
        },
        modes: {
          push: {
            quantity: 4
          },
          repulse: {
            distance: 200,
            duration: 0.4
          }
        }
      },
      particles: {
        color: {
          value: "#4F46E5" // Matches your design's blue color
        },
        links: {
          color: "#4F46E5",
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce"
          },
          random: false,
          speed: 1,
          straight: false
        },
        number: {
          density: {
            enable: true,
            area: 800
          },
          value: 50
        },
        opacity: {
          value: 0.4
        },
        shape: {
          type: "circle"
        },
        size: {
          value: { min: 1, max: 3 }
        }
      },
      detectRetina: true
    }),
    []
  );

  // Only render Particles component after initialization
  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      className="absolute inset-0 -z-10" // Position behind content
    />
  );
};

export default ParticleBackground;