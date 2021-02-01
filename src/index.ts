import { ScalingCanvas } from "@azleur/scaling-canvas";
import { Rect } from "@azleur/rect";

/** Callback wrapper passed to the Update() function from the running game loop. */
export type SceneCallbacks = {
    Next: (nextScene: Scene) => void,
};

/**
 * Your code here.
 *
 * * Set the World rect as the viewport, in in-game coordinates.
 * * Run your update logic in Update().
 *      * dT: Time delta since last tick, in seconds (float).
 *      * callbacks: Utility functions to interact with the loop (e.g. change scene).
 * * Display your graphics in Render().
 *      * canvas: A ScalingCanvas instance, automatically adjusted to your world coordinates.
 */
export type Scene = {
    World: Rect,
    Update: (dT: number, callbacks: SceneCallbacks) => void,
    Render: (canvas: ScalingCanvas) => void,
    OnKeydown?: (event: KeyboardEvent) => void,
};

/**
 * Kickstarting point. Run this method to start the game loop.
 *
 * @param canvasId ID of the target HTML Canvas element.
 * @param scene First scene to run (use callbacks to switch scene).
 */
export const Start = (canvasId: string, scene: Scene): void => {

    const callbacks: SceneCallbacks = {
        Next: (nextScene: Scene): void => {
            if (scene.OnKeydown) {
                window.removeEventListener("keydown", scene.OnKeydown);
            }
            if (nextScene.OnKeydown) {
                window.addEventListener("keydown", nextScene.OnKeydown);
            }
            scene = nextScene;
        },
    };

    const rawCanvas = document.getElementById(canvasId);
    if (!(rawCanvas instanceof HTMLCanvasElement)) {
        throw new Error(`ID does not correspond to an HTMLCanvasElement: #${canvasId}`);
    }

    callbacks.Next(scene);

    const canvas = new ScalingCanvas(rawCanvas);
    canvas.AdjustCamera(scene.World); // TODO: Check if this needs to be done per-tick.

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