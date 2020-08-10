import { ScalingCanvas } from "@azleur/scaling-canvas";
import { Rect } from "@azleur/rect";

/** Callback wrapper passed to the Update() function from the running game loop. */
export type SceneCallbacks = {
    Next: (nextScene: Scene) => void,
};

export type Scene = {
    World: Rect,
    Update: (dT: number, callbacks: SceneCallbacks) => void,
    Render: (canvas: ScalingCanvas) => void,
};

export const Start = (canvasId: string, scene: Scene): void => {

    const callbacks: SceneCallbacks = {
        Next: (nextScene: Scene): void => {
            scene = nextScene;
        },
    };

    const rawCanvas = document.getElementById(canvasId);
    if(!(rawCanvas instanceof HTMLCanvasElement)) {
        throw new Error(`ID does not correspond to an HTMLCanvasElement: #${canvasId}`);
    }

    const canvas = new ScalingCanvas(rawCanvas);
    canvas.AdjustCamera(scene.World);

    let time: number = 0;

    const tick = (millis: number) => {
        const newTime = millis / 1000;
        let dT = newTime - time;
        time = newTime;

        scene.Update(dT, callbacks);
        scene.Render(canvas);

        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};