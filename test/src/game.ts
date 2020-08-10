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
            World,
            Update: (dT: number, callbacks: SceneCallbacks) => {
                totalTime += dT;
                console.log(totalTime);

                if(totalTime < 1) {
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

    const Scene_2 = (): Scene => {
        return {
            World,
            Update: (dT: number, callbacks: SceneCallbacks): void => {},
            Render: (canvas: ScalingCanvas): void => {
                canvas.Clear("red");
            },
        };
    };

    Start("my-canvas", Scene_1());
}