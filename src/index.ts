import { ScalingCanvas } from "@azleur/scaling-canvas";
import { Rect } from "@azleur/rect";

export type Scene = {
    World: Rect,
    Update: (dT: number) => void,
    Render: (canvas: ScalingCanvas) => void,
};

export const Start = (canvasId: string, scene: Scene): void => {

    const rawCanvas = document.getElementById(canvasId);
    if(!(rawCanvas instanceof HTMLCanvasElement)) {
        throw new Error(`ID does not correspond to an HTMLCanvasElement: #${canvasId}`);
    }

    const canvas = new ScalingCanvas(rawCanvas);
    canvas.AdjustCamera(scene.World);

    let time: number = 0;

    const tick = (millis: number) => {
        const newTime = millis / 1000;
        let dT = time - newTime;
        time = newTime;

        scene.Update(dT);
        scene.Render(canvas);

        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};