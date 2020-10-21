import { useEffect, useRef } from "react";

var inputX, inputY;

const useLinearInterpolation = () => {
  const container = useRef(null);
  const element = useRef(null);
  const raf = useRef(null);
  const boxCenter = useRef({ x: null, y: null });
  const bbox = useRef({});
  const pointerCoordinate = useRef({ x: null, y: null });
  const setElement = (val) => {
    element.current = val;
  };

  const setContainer = (val) => {
    container.current = val;
  };

  const setRaf = (val) => {
    raf.current = val;
  };

  const setBoxCenter = (val) => {
    boxCenter.current = val;
  };

  const setBbox = (val) => {
    bbox.current = val;
  };

  const setPointerCoordinate = (val) => {
    pointerCoordinate.current = val;
  };

  const userPress = (event) => {
    setElement(event.target);

    if (event.target.classList.contains("box")) {
      inputX = event.clientX;
      inputY = event.clientY;
      setBbox(element.current.getBoundingClientRect());
      setBoxCenter({
        x: bbox.current.left + bbox.current.width / 2,
        y: bbox.current.top + bbox.current.height / 2,
      });

      container.current.addEventListener("pointermove", userMove, {
        passive: true,
      });
      container.current.addEventListener("pointerup", userRelease, {
        passive: true,
      });
      container.current.addEventListener("pointercancel", userRelease, {
        passive: true,
      });
      setRaf(requestAnimationFrame(userMoveRaf));
    }
  };

  const userMove = (event) => {
    setPointerCoordinate({ x: event.clientX, y: event.clientY });
  };

  const userMoveRaf = () => {
    let x = lerp(boxCenter.current.x, pointerCoordinate.current.x, 0.01);
    let y = lerp(boxCenter.current.y, pointerCoordinate.current.y, 0.01);

    element.current.style.left = x - bbox.current.width / 2 + "px";
    element.current.style.top = y - bbox.current.height / 2 + "px";
    setBoxCenter({ x, y });
    setRaf(requestAnimationFrame(userMoveRaf));
  };

  const userRelease = () => {
    // const container = document.querySelector(".container");

    container.current.removeEventListener("pointermove", userMove, {
      passive: true,
    });
    container.current.removeEventListener("pointerup", userRelease, {
      passive: true,
    });
    container.current.removeEventListener("pointercancel", userRelease, {
      passive: true,
    });
    if (raf) {
      cancelAnimationFrame(raf.current);
      setRaf(null);
    }
  };

  const lerp = (start, end, amt) => {
    return (1 - amt) * start + amt * end;
  };
  useEffect(() => {
    setContainer(document.querySelector(".container"));
    container.current.addEventListener("pointerdown", userPress, {
      passive: true,
    });
    return () => {
      container.current.removeEventListener("pointerdown", userPress, {
        passive: true,
      });
    };
  }, []);

  return;
};

export default useLinearInterpolation;

// use requestAnimationFrame thay vì setInterval để tạo animation
// use pointer events api
// kỹ thuật phép nội soi tuyến tính https://en.wikipedia.org/wiki/Linear_interpolation
