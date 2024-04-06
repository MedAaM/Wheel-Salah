import React , {useState,useEffect} from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../App.css';
import 'animate.css'


import { tsParticles } from "https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.1.0/+esm";
import { loadAll } from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.1.0/+esm";

async function loadParticles(options) {
  await loadAll(tsParticles);

  await tsParticles.load({ id: "tsparticles", options });
}

const configs = {
  name: "Fireworks Mask",
  fullScreen: {
    enable: true
  },
 
  emitters: {
    direction: "top",
    life: {
      count: 0,
      duration: 0.1,
      delay: 0.1
    },
    rate: {
      delay: 0.15,
      quantity: 1
    },
    size: {
      width: 100,
      height: 0
    },
    position: {
      y: 100,
      x: 50
    }
  },
  particles: {
    color: {
      value: "#fff"
    },
    number: {
      value: 0
    },
    destroy: {
      bounds: {
        top: 30
      },
      mode: "split",
      split: {
        count: 1,
        factor: {
          value: 0.333333
        },
        rate: {
          value: 100
        },
        particles: {
          stroke: {
            width: 0
          },
          color: {
            value: ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"]
          },
          number: {
            value: 0
          },
          collisions: {
            enable: false
          },
          destroy: {
            bounds: {
              top: 0
            }
          },
          opacity: {
            value: {
              min: 0.1,
              max: 1
            },
            animation: {
              enable: true,
              speed: 0.7,
              sync: false,
              startValue: "max",
              destroy: "min"
            }
          },
          effect: {
            type: "trail",
            options: {
              trail: {
                length: {
                  min: 5,
                  max: 10
                }
              }
            }
          },
          shape: {
            type: "circle"
          },
          size: {
            value: 2,
            animation: {
              enable: false
            }
          },
          life: {
            count: 1,
            duration: {
              value: {
                min: 1,
                max: 2
              }
            }
          },
          move: {
            enable: true,
            gravity: {
              enable: true,
              acceleration: 9.81,
              inverse: false
            },
            decay: 0.1,
            speed: {
              min: 10,
              max: 25
            },
            direction: "outside",
            outModes: "destroy"
          }
        }
      }
    },
    life: {
      count: 1
    },
    effect: {
      type: "trail",
      options: {
        trail: {
          length: {
            min: 10,
            max: 30
          },
          minWidth: 1,
          maxWidth: 1
        }
      }
    },
    rotate: {
      path: true
    },
    shape: {
      type: "circle"
    },
    size: {
      value: 1
    },
    move: {
      enable: true,
      gravity: {
        acceleration: 15,
        enable: true,
        inverse: true,
        maxSpeed: 100
      },
      speed: {
        min: 10,
        max: 20
      },
      outModes: {
        default: "destroy",
        top: "none"
      }
    }
  },
  sounds: {
    enable: true,
    events: [
      {
        event: "particleRemoved",
        filter: (args) => args.data.particle.options.move.gravity.inverse,
        audio: [
          "https://particles.js.org/audio/explosion0.mp3",
          "https://particles.js.org/audio/explosion1.mp3",
          "https://particles.js.org/audio/explosion2.mp3"
        ]
      }
    ],
    volume: 50
  }
};

function ModalWin({ openModal, cancelModal, winner, automaticSpin, newWinnerIndex, removeWinnerModal, winners }) {
    

    const [showAnimation, setShowAnimation] = useState(false);
    

    useEffect(() => {
        setShowAnimation(openModal);
      }, [openModal]);

    const handleClose = () => {
        cancelModal();
        setShowAnimation(false); // Hide animation when modal closes
      };

    const zip = () => {
        loadParticles(configs);
      };
      
 
  return (
    <>
    {(showAnimation && automaticSpin && winner && zip() ) || (showAnimation && !automaticSpin) && zip()}
    
     <Modal show={openModal} onHide={cancelModal}  size="lg">
     
            <Modal.Header closeButton>
                {winner || !automaticSpin ? (<Modal.Title>Winner 🎉</Modal.Title>) : (<Modal.Title>Thank you For Partipating with us 😀👋</Modal.Title>)}
            </Modal.Header>
            <Modal.Body style={{height: "150px", backgroundColor: "rgb(223 242 206)"}} >
                 {winner ? (
                  <>
                      <div id='animation-lottie'>
                      <dotlottie-player src="https://lottie.host/9b206332-3bc8-41f1-9851-33a40843f9f1/OcBXDrGavg.json" background="transparent" speed="1" style={{width: "300px", height: "300px"}} loop autoplay className="lottie"></dotlottie-player>
                      </div> 
                      <p className='mounir'>{winner}</p>
                      </>
                       ) : ( 
                          !automaticSpin ? (
                            <>
                            <div id='animation-lottie'>
                           <dotlottie-player src="https://lottie.host/9b206332-3bc8-41f1-9851-33a40843f9f1/OcBXDrGavg.json" background="transparent" speed="1" style={{width: "320px", height: "320px"}} loop autoplay className="lottie"></dotlottie-player>
                           </div>
                             <p className='mounir'>{winners[newWinnerIndex]}</p>
                            
                             </>
                             ) : (
                              <>
                              
                              <h1 class="animate__animated animate__fadeOutDown animate__delay-2s h1-looser">{winners[newWinnerIndex]}</h1>
                              <span class="wave">👋</span>

                             </>
                             )
                          )}
            </Modal.Body>
             {showAnimation &&  ( 
                <>
                 <div className={winner || !automaticSpin ? 'firework' : '' } id={winner || !automaticSpin ? 'firework1' : '' }>
	                   <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
                      	<div class="explosion"></div>
                 	    <div class="explosion"></div>
                   	    <div class="explosion"></div>
	                      <div class="explosion"></div>
	                     <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
                  </div>
                 <div className={winner || !automaticSpin ? 'firework' : '' } id={winner || !automaticSpin ? 'firework2' : '' }>
	                <div class="explosion"></div>
	                <div class="explosion"></div>
	                <div class="explosion"></div>
	                <div class="explosion"></div>
	                <div class="explosion"></div>
	                <div class="explosion"></div>
	                <div class="explosion"></div>
	                <div class="explosion"></div>
	                <div class="explosion"></div>
	                <div class="explosion"></div>
	                <div class="explosion"></div>
	                <div class="explosion"></div>
                </div>
                  <div className={winner || !automaticSpin ? 'firework' : '' } id={winner || !automaticSpin ? 'firework3' : '' }>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
	                    <div class="explosion"></div>
                 </div>
                 </>
                )}
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                {!automaticSpin && (<Button variant="primary" onClick={removeWinnerModal}>
                    Send Email
                </Button>)}
            </Modal.Footer>
        
        </Modal>


        </>
        
    );
}

export default ModalWin;