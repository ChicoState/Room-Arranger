import React, { useState } from "react";
import Moveable from "react-moveable";
import Selecto from "react-selecto";
import InfiniteViewer from "react-infinite-viewer";
import { flushSync } from "react-dom";
import axios from 'axios';
import './home.css';
import furnitureList from "./furnitureData.js";
import structureList from "./structureData.js"

const apiurl = "http://127.0.0.1:8000/testpost/";
const inchPixelRatio = 3;
const initRoomWidth = "168in"
const initRoomHeight = "144in"

const inchToPx = (inches) => {
  inches = parseFloat(inches);
  var pixels = inches*inchPixelRatio;
  return pixels;
}

const pxToInch = (pixels) => {
  pixels = parseFloat(pixels);
  var inches = pixels/inchPixelRatio;
  return inches;
}

const generateUID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const normalizeRotation = (rotation) => {
  var nRotation = parseFloat(rotation) % 360;
  if (nRotation < 0) 
    nRotation += 360;

  return nRotation;
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

const parseTransform = (transformText) => {
  const rotateRE = new RegExp('rotate\\((.*)\\)');
  const xRE = new RegExp('translate\\((.*),');
  const yRE = new RegExp('translate\\(.*, (.*?)\\)');

  const rotate = (transformText.match(rotateRE)) ? transformText.match(rotateRE)[1] : "0deg";
  const x = (transformText.match(xRE)) ? transformText.match(xRE)[1] : "0px";
  const y = (transformText.match(yRE)) ? transformText.match(yRE)[1] : "0px";

  return { rotate: rotate, x: x, y: y };
}


const Home = () => {
  const [activeObjects, setActiveObjects] = useState([]);
  const [strucTargets, setStrucTargets] = useState([]);
  const [scrollOptions, setScrollOptions] = useState({});
  const [furnTargets, setFurnTargets] = useState([]);
  const [designMode, setDesignMode] = useState("room");
  const [roomLock, setRoomLock] = useState(false);
  const [zoom, setZoom] = useState(1);

  const moveableRef = React.useRef(null);
  const selectoRef = React.useRef(null);
  const boxRef = React.useRef(null);
  const viewerRef = React.useRef(null);

  const xInputRef = React.useRef(null);
  const yInputRef = React.useRef(null);
  const widthInputRef = React.useRef(null);
  const heightInputRef = React.useRef(null);
  const rotateInputRef = React.useRef(null);

  const roomWidthInputRef = React.useRef(null);
  const roomHeightInputRef = React.useRef(null);

  React.useEffect(() => {
    initScrollOptions();
    zoomFit();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const initScrollOptions = () => {
    setScrollOptions({
      container: viewerRef.current.getElement(),
      getScrollPosition: () => {
        return [
          viewerRef.current.getScrollLeft(),
          viewerRef.current.getScrollTop()
        ];
      },
      throttleTime: 30,
      threshold: 0
    });
  }

  const [requestCallbacksFurniture] = useState(() => {
    function request() {

      moveableRef.current.request("draggable", {
        x: inchToPx(xInputRef.current.value),
        y: inchToPx(yInputRef.current.value),
      }, true);

      moveableRef.current.request("resizable", {
        offsetWidth: inchToPx(widthInputRef.current.value),
        offsetHeight: inchToPx(heightInputRef.current.value),
      }, true);

      moveableRef.current.request("rotatable", {
        rotate: parseInt(rotateInputRef.current.value),
      }, true);
    }

    return {
      onInput(e) {
        const ev = (e.nativeEvent || e);

        if (typeof ev.data === "undefined") {
          request();
        }
      },
      onKeyUp(e) {
        e.stopPropagation();

        if (e.keyCode === 13) {
          request();
        }
      },
    };
  });

  

  const [requestCallbacksRoom] = useState(() => {

    function request() {
      boxRef.current.request("resizable", {
        offsetWidth: inchToPx(roomWidthInputRef.current.value),
        offsetHeight: inchToPx(roomHeightInputRef.current.value),
      }, true);
    }


    return {
      onInput(e) {
        const ev = (e.nativeEvent || e);

        if (typeof ev.data === "undefined") {
          request();
        }
      },
      onKeyUp(e) {
        e.stopPropagation();

        if (e.keyCode === 13) {
          request();
        }
      },
    };
  });


  const handleRemove = (uid) => {
    const foundItem = activeObjects.find(f => f.uid === uid);
    const z = foundItem.z

    if (designMode === "furnish" && foundItem.type === "structural")
      return;
    if (designMode === "room" && foundItem.type === "furniture")
      return;

    const _activeObjects = activeObjects.map(f => {
      if (f.z > z) {
        f.z -= 1;
      }

      return f;
    })

    setActiveObjects(_activeObjects.filter((f) => f.uid !== uid));
    if (designMode === "room")
      setStrucTargets([]);
    else
      setFurnTargets([]);
  };

  const handleZoomChange = (newZoom) => {
    if (newZoom < .1 || newZoom > 10)
      return;
    setZoom(newZoom);
  }

  const handleAdd = (itemKey) => {
    const activeList = (designMode === "room" ? structureList : furnitureList);
    const foundItem = activeList.find(f => parseInt(f.itemKey) === parseInt(itemKey));
    const newActvObj = Object.assign({}, foundItem);
    newActvObj.uid = generateUID();
    newActvObj.z = activeObjects.length + 1;
    newActvObj.width = newActvObj.defaultWidth;
    newActvObj.height = newActvObj.defaultHeight;

    const roomWidth = document.getElementById("room").style.width;
    const roomHeight = document.getElementById("room").style.height;
    var newObjX = parseFloat(roomWidth / 2 - newActvObj.width / 2);
    var newObjY = parseFloat(roomHeight / 2 - newActvObj.height / 2);

    newActvObj.rotate = 0;
    newActvObj.x = newObjX;
    newActvObj.y = newObjY;

    setActiveObjects(oldArray => [...oldArray, newActvObj]);
  }

  

  const clearFurniture = () => {
    setActiveObjects(activeObjects.filter((f) => f.type !== "furniture"));
    setFurnTargets([]);
  }

  const handleModeChange = (e) => {
    const checked = e.target.checked;
    setDesignMode(checked ? "furnish" : "room");
  };

  const onKeyPressed = (e) => {
    const keyCode = e.keyCode;
    const dataKey = e.target.getAttribute("data-key");

    if (keyCode === 8 || keyCode === 46) {
      handleRemove(dataKey);
    }
  };

  

  const updateFurnitureForm = (e) => {
    requestAnimationFrame(() => {
      const rect = e.moveable.getRect();
      xInputRef.current.value = `${round(pxToInch(rect.left), 0)}`;
      yInputRef.current.value = `${round(pxToInch(rect.top), 0)}`;
      widthInputRef.current.value = `${round(pxToInch(rect.offsetWidth), 0)}`;
      heightInputRef.current.value = `${round(pxToInch(rect.offsetHeight), 0)}`;
      rotateInputRef.current.value = `${round(rect.rotation, 0)}`;
    })
  };

  const updateRoomForm = (e) => {
    requestAnimationFrame(() => {
      const rect = e.moveable.getRect();
      roomWidthInputRef.current.value = `${round(pxToInch(rect.offsetWidth), 0)}`;
      roomHeightInputRef.current.value = `${round(pxToInch(rect.offsetHeight), 0)}`;
    })
  };



  

  const exportData = () => {
    const _activeObjects = [...activeObjects];
    const child = document.getElementById("room").childNodes;
    child.forEach((c) => {
      if (c.classList.contains("furn-target") || c.classList.contains("struc-target")) {
        // get values from html element
        const uid = c.getAttribute("data-key");
        const w = c.style.width;
        const h = c.style.height;
        const t = parseTransform(c.style.transform);

        // find corresponding item in activeObjects
        const foundItem = _activeObjects.find(f => f.uid === uid);
        foundItem.width = round(pxToInch(w), 3);
        foundItem.height = round(pxToInch(h), 3);
        foundItem.x = round(pxToInch(t.x), 3);
        foundItem.y = round(pxToInch(t.y), 3);
        foundItem.rotate = normalizeRotation(t.rotate);
      }
    })


    var roomWidth = document.getElementById("room").style.width;
    var roomHeight = document.getElementById("room").style.height;

    roomWidth = round(pxToInch(roomWidth), 3);
    roomHeight = round(pxToInch(roomHeight), 3);


    const jsonObj = {};
    jsonObj.room = { width: roomWidth, height: roomHeight };
    jsonObj.activeObjects = _activeObjects;

    const jsonStr = JSON.stringify(jsonObj, undefined, 4);
    console.log("posted: ")
    console.log(jsonStr);
    console.log("response: ")
    axios.post(apiurl, jsonObj)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }


  const bringFront = () => {
    // return if no item currently selected
    if (!moveableRef.current.refTargets || moveableRef.current.refTargets.length < 1)
      return;

    const uid = moveableRef.current.refTargets[0].getAttribute("data-key");
    const foundItem = activeObjects.find(f => f.uid === uid);
    const oldZ = foundItem.z;

    const _activeObjects = activeObjects.map(f => {
      if (uid === f.uid) {
        f.z = activeObjects.length;
      }
      else if (f.z > oldZ) {
        f.z -= 1;
      }

      return f;
    })

    setActiveObjects(_activeObjects);
  }

  const sendBack = () => {
    if (!moveableRef.current.refTargets || moveableRef.current.refTargets.length < 1)
      return;

    const uid = moveableRef.current.refTargets[0].getAttribute("data-key");
    const foundItem = activeObjects.find(f => f.uid === uid);
    const oldZ = foundItem.z;

    const _activeObjects = activeObjects.map(f => {
      if (uid === f.uid) {
        f.z = 1;
      }
      else if (f.z < oldZ) {
        f.z += 1;
      }

      return f;
    })

    setActiveObjects(_activeObjects);
  }

  const DimensionViewable = {
    name: "dimensionViewable",
    props: {},
    events: {},
    render(moveable, React) {
      const rect = moveable.getRect();

      return <div key={"dimension-viewer"} className={"moveable-dimension"} style={{
        position: "absolute",
        left: `${rect.width / 2}px`,
        top: `${rect.height + 20}px`,
        background: "#4af",
        borderRadius: "2px",
        padding: `${2}px ${4}px`,
        color: "white",
        fontSize: `${13 * 1 / zoom}px`,
        whiteSpace: "nowrap",
        fontWeight: "bold",
        willChange: "transform",
        transform: `translate(-50%, 0px)`,
      }}>
        {Math.round(pxToInch(rect.offsetWidth))}" x {Math.round(pxToInch(rect.offsetHeight))}"
      </div>;
    },
  };

  const zoomFit = (timeOut = 0) => {
    var ivWidth = document
      .getElementsByClassName("infinite-viewer")[0]
      .getBoundingClientRect().width;
    var ivHeight = document
      .getElementsByClassName("infinite-viewer")[0]
      .getBoundingClientRect().height;
    var rWidth = parseInt(
      document.getElementsByClassName("room")[0].style.width,
      10
    );
    var rHeight = parseInt(
      document.getElementsByClassName("room")[0].style.height,
      10
    );
    var borderWidth = parseInt(
      document.getElementsByClassName("room")[0].style.borderWidth,
      10
    );

    rWidth += 2 * borderWidth;
    rHeight += 2 * borderWidth;

    var x = getCenterPosLeft(ivWidth, rWidth);
    var y = getCenterPosTop(ivHeight, rHeight);

    var padX = 0.2 * ivWidth;
    var padY = 0.2 * ivHeight;

    var newZoom = getZoomFitValue(
      ivWidth,
      ivHeight,
      rWidth,
      rHeight,
      padX,
      padY
    );

    var xScroll = ((1 - 1 / newZoom) / 2) * ivWidth;
    var yScroll = ((1 - 1 / newZoom) / 2) * ivHeight;

    moveRoom(x, y);
    setZoom(newZoom);

    // schedule async callback
    setTimeout(() => {
      viewerRef.current.scrollTo(xScroll, yScroll);
    }, 10);
  };

  const getZoomFitValue = (
    ivWidth,
    ivHeight,
    rWidth,
    rHeight,
    padX = 0,
    padY = 0
  ) => {
    var maxZoomX = (ivWidth - padX) / rWidth;
    var maxZoomY = (ivHeight - padY) / rHeight;
    return Math.min(maxZoomX, maxZoomY);
  };

  const getCenterPosLeft = (ivWidth, rWidth) => {
    return ivWidth / 2 - rWidth / 2;
  };

  const getCenterPosTop = (ivHeight, rHeight) => {
    return ivHeight / 2 - rHeight / 2;
  };

  const moveRoom = (x, y) => {
    const room = document.getElementById("room");
    room.style.transform = `translate(${x}px,${y}px)`;
    boxRef.current.updateRect();
  };


  return (
    <div className="home-page">
      <div className="left-bar">
        <div className="card-container">
          {
            (designMode === "room")
              ?
              structureList.map((f) => (
                <div className="card structure" key={f.itemKey} data-key={f.itemKey} onClick={() => handleAdd(f.itemKey)}>
                  <div className="image-container">
                    <img src={f.url} alt={f.description} draggable="false" />
                  </div>
                  <div className="description">{f.description}</div>
                </div>
              ))
              :
              furnitureList.map((f) => (
                <div className="card furniture" key={f.itemKey} data-key={f.itemKey} onClick={() => handleAdd(f.itemKey)}>
                  <div className="image-container">
                    <img src={f.url} alt={f.description} draggable="false" />
                  </div>
                  <div className="description">{f.description}</div>
                </div>
              ))
          }
        </div>
      </div>
      <div className="design-area-wrapper">
        <InfiniteViewer zoom={zoom} className="infinite-viewer" ref={viewerRef}>
          <div>
            <div className="room" ref={boxRef} id="room" 
            style={{ width: `${inchToPx(initRoomWidth)}px`, height: `${inchToPx(initRoomHeight)}px`, position: "absolute",
                     borderWidth: "3px" }}>
              {activeObjects.map((f) => (
                <img
                  draggable="false"
                  src={f.url}
                  key={f.uid}
                  data-key={f.uid}
                  className={`${f.type === "furniture" ? "furn-target" : "struc-target"} ${f.category}`}
                  alt={f.description}
                  onKeyDown={onKeyPressed}
                  tabIndex="-1"
                  style={{
                    draggable: false,
                    position: "absolute",
                    zIndex: `${f.z}`,
                    width: `${inchToPx(f.width)}px`,
                    height: `${inchToPx(f.height)}px`,
                    transform: `translate(${inchToPx(f.x)}px, ${inchToPx(f.y)}px) rotate(${f.rotate}deg)`
                  }}
                />
              ))}
              <Moveable
                rootContainer={document.body}
                flushSync={flushSync}
                ref={moveableRef}
                props={{
                  dimensionViewable: true,
                }}
                ables={[DimensionViewable]}
                target={(designMode === "furnish") ? furnTargets : strucTargets}
                zoom={1 / zoom}
                draggable={true}
                throttleDrag={1}
                throttleRotate={5}
                resizable={true}
                renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
                rotatable={true}
                scrollable={true}
                scrollOptions={scrollOptions}
                onScroll={({ direction }) => {
                  viewerRef.current.scrollBy(
                    direction[0] * 10,
                    direction[1] * 10
                  );
                }}
                onDragStart={e => {
                  e.target.focus();
                }}
                onDrag={e => {
                  e.target.style.transform = e.transform;
                }}
                onRotate={e => {
                  e.target.style.transform = e.drag.transform;
                }}
                onResize={e => {
                  e.target.style.width = `${e.width}px`;
                  e.target.style.height = `${e.height}px`;
                  e.target.style.transform = e.drag.transform;
                }}
                onDragEnd={e => {
                  updateFurnitureForm(e);
                }}
                onRotateEnd={e => {
                  updateFurnitureForm(e);
                }}
                onResizeEnd={e => {
                  updateFurnitureForm(e);
                }}
              ></Moveable>
              <Selecto
                ref={selectoRef}
                selectableTargets={(designMode === "furnish") ? [".furn-target"] : [".struc-target"]}
                dragContainer={".room"}
                hitRate={0}
                selectByClick={true}
                selectFromInside={false}
                ratio={0}
                onDragStart={e => {
                  const moveable = moveableRef.current;
                  const target = e.inputEvent.target;
                  const activeTargets = (designMode === "furnish") ? furnTargets : strucTargets;
                  if (moveable.isMoveableElement(target) || activeTargets.some(t => t === target || t.contains(target))) {
                    e.stop();
                  }
                }}
                onSelectEnd={e => {
                  const moveable = moveableRef.current;
                  if (designMode === "furnish")
                    setFurnTargets(e.selected);
                  else
                    setStrucTargets(e.selected);

                  if (e.isDragStart) {
                    e.inputEvent.preventDefault();

                    setTimeout(() => {
                      moveable.dragStart(e.inputEvent);
                    });
                  }
                }}
              ></Selecto>
            </div>
            <Moveable
              rootContainer={document.body}
              flushSync={flushSync}
              props={{
                dimensionViewable: true,
              }}
              ables={[DimensionViewable]}
              target={(((designMode === "room") && !(roomLock)) ? ".room" : ".dummyvalue")}
              scrollable={true}
              scrollOptions={scrollOptions}
              ref={boxRef}
              resizable={true}
              zoom={1 / zoom}
              onResize={(e) => {
                e.target.style.width = `${e.width}px`;
                e.target.style.height = `${e.height}px`;
                e.target.style.transform = e.drag.transform;
              }}
              onResizeEnd={e => {
                updateRoomForm(e);
              }}
              onScroll={({ direction }) => {
                viewerRef.current.scrollBy(
                  direction[0] * 10,
                  direction[1] * 10
                );
              }}
            ></Moveable>
          </div>
        </InfiniteViewer>
      </div>
      <div className="right-bar">
        {
          (designMode === "furnish")
            ?
            <div>
              <div>
                <button onClick={(e) => { e.preventDefault(); handleZoomChange(zoom + .1); }}>Zoom In</button>
                <button onClick={(e) => { e.preventDefault(); handleZoomChange(zoom - .1); }}>Zoom Out</button>
                <button onClick={(e) => {e.preventDefault(); zoomFit();}}>Zoom Fit</button>
              </div>
              <br />
              <br />
              <div>Object Dimensions</div>
              <br />
              <label htmlFor="xyz">X:</label><br />
              <input ref={xInputRef} {...requestCallbacksFurniture} type="number" id="x" name="x" /><br />
              <label htmlFor="y">Y:</label><br />
              <input ref={yInputRef} {...requestCallbacksFurniture} type="number" id="y" name="y" /><br />
              <label htmlFor="width">Width</label><br />
              <input ref={widthInputRef} {...requestCallbacksFurniture} type="number" id="width" name="width" /><br />
              <label htmlFor="height">Height</label><br />
              <input ref={heightInputRef} {...requestCallbacksFurniture} type="number" id="height" name="height" /><br />
              <label htmlFor="rotation">Rotation:</label><br />
              <input ref={rotateInputRef} {...requestCallbacksFurniture} type="number" id="rotation" name="rotation" /><br />
              <br /><br />
              <button onClick={clearFurniture}>Clear</button>
              <br /><br />
              <button onClick={bringFront}>Bring Front</button>
              <button onClick={sendBack}>Send Back</button>
              <br /><br />
              <button onClick={exportData}>Dev: Send Furn Data to Back End</button>
            </div>
            :
            <div className="roomFormEntry" key="roomFormEntry">
              <div>
                <button onClick={(e) => { e.preventDefault(); handleZoomChange(zoom + .1); }}>Zoom In</button>
                <button onClick={(e) => { e.preventDefault(); handleZoomChange(zoom - .1); }}>Zoom Out</button>
                <button onClick={(e) => {e.preventDefault(); zoomFit();}}>Zoom Fit</button>
              </div>
              <br />
              <br />
              <div>Room Dimensions</div>
              <label htmlFor="roomWidth">Lock:</label>
              <input type="checkbox" checked={roomLock} onChange={(e) => setRoomLock(e.target.checked)} />
              <br />
              <br />
              <label htmlFor="roomWidth">Width:</label><br />
              <input readOnly={roomLock} ref={roomWidthInputRef} {...requestCallbacksRoom} type="number" id="roomWidth" name="roomWidth" /><br />
              <label htmlFor="roomHeight">Height:</label><br />
              <input readOnly={roomLock} ref={roomHeightInputRef} {...requestCallbacksRoom} type="number" id="roomHeight" name="roomHeight" /><br />
              <br />

              <div>Object Dimensions</div>
              <br />

              <label htmlFor="x">X:</label><br />
              <input ref={xInputRef} {...requestCallbacksFurniture} type="number" id="x" name="x" /><br />
              <label htmlFor="y">Y:</label><br />
              <input ref={yInputRef} {...requestCallbacksFurniture} type="number" id="y" name="y" /><br />
              <label htmlFor="width">Width</label><br />
              <input ref={widthInputRef} {...requestCallbacksFurniture} type="number" id="width" name="width" /><br />
              <label htmlFor="height">Height</label><br />
              <input ref={heightInputRef} {...requestCallbacksFurniture} type="number" id="height" name="height" /><br />
              <label htmlFor="rotation">Rotation:</label><br />
              <input ref={rotateInputRef} {...requestCallbacksFurniture} type="number" id="rotation" name="rotation" /><br />
              <br /><br />

            </div>
        }
        <div>
          <p className="tog">{designMode === "furnish" ? "Floor Plan" : "Furnish"}</p>
          <label className="switch tog">
            <input type="checkbox" checked={(designMode === "furnish")} onChange={handleModeChange} />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};



export default Home;