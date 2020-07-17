import { Vec2 } from "@azleur/vec2";
import { FromCenterRadius } from "@azleur/rect";
import { ScalingCanvas } from "@azleur/scaling-canvas";
import { Scene, Start } from "@azleur/game-loop";

window.onload = () => {

    const MakeScene = (): Scene => {
        console.log(Vec2.Zero);
        console.log(FromCenterRadius(Vec2.Zero, 2));
        const World = FromCenterRadius(Vec2.Zero, 2);
        console.log(World);
        let pos = Vec2.Right;
        let vel = Vec2.Up;

        console.log(World, pos, vel);

        return {
            World,
            Update: (dT: number) => {
                const accel = pos.Negate();
                vel = vel.Add(accel.Times(dT));
                pos = pos.Add(vel.Times(dT));
            },
            Render: (canvas: ScalingCanvas) => { 
                canvas.Clear("white");
                canvas.FillCircle(pos, 0.1, { brush: "blue" });
            },
        };
    };

    Start("my-canvas", MakeScene());
}