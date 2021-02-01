import { Vec2 } from "@azleur/vec2";
import { FromCenterRadius } from "@azleur/rect";
import { ScalingCanvas } from "@azleur/scaling-canvas";
import { Scene, Start, SceneCallbacks } from "@azleur/game-loop";

window.onload = () => {

    const World = FromCenterRadius(Vec2.Zero, 2);

    const Scene_1 = (): Scene => {
        let pos = Vec2.Right;
        let vel = Vec2.Up;
        let totalTime = 0;

        return {
            Viewport: () => World,
            Update: (dT: number, callbacks: SceneCallbacks) => {
                totalTime += dT;
                console.log(totalTime);

                if (totalTime < 1) {
                    const accel = pos.Negate();
                    vel = vel.Add(accel.Times(dT));
                    pos = pos.Add(vel.Times(dT));
                } else {
                    console.log("Change scene");
                    callbacks.Next(Scene_2());
                }
            },
            Render: (canvas: ScalingCanvas): void => {

                canvas.Clear("white");
                canvas.FillCircle(pos, 0.1, { brush: "blue" });
            },
        };
    };

    let JitteredWorld = World;
    let w = 0;

    const Scene_2 = (): Scene => {
        let next = false;
        return {
            Viewport: () => JitteredWorld,
            Update: (dT: number, callbacks: SceneCallbacks): void => {
                w += dT;
                JitteredWorld = World.Translate(Vec2.Right.Times(0.5 * Math.sin(w)));
                if (next) {
                    next = false;
                    callbacks.Next(Scene_1());
                }
            },
            Render: (canvas: ScalingCanvas): void => {
                canvas.Clear("red");
                canvas.Write(Vec2.Left, "SCENE 2 (R to restart)", { brush: "black", font: "bold 2rem arial" });
            },
            OnKeydown: (event: KeyboardEvent) => {
                if (event.key === 'r') {
                    next = true;
                }
            },
        };
    };

    Start("my-canvas", Scene_1());
}