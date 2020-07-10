import { ScalingCanvas } from "@azleur/scaling-canvas";
import { Rect } from "@azleur/rect";

export type Scene = {
    World: Rect,
    Update: (dT: number) => void,
    Render: (canvas: ScalingCanvas) => void,
};

export const Start = (canvasId: string, scene: Scene): void => {

    console.log("==== BEGIN Start() ====");
    const rawCanvas = document.getElementById(canvasId) as HTMLCanvasElement;
    console.log("rawCanvas:", rawCanvas);
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
    console.log("==== END Start() ====");
};