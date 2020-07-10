import { Vec2 } from "@azleur/vec2";
import { FromCenterRadius } from "@azleur/rect";
import { ScalingCanvas } from "@azleur/scaling-canvas";
import { Scene, Start } from "@azleur/game-loop";

console.log("======== game.ts ========");

const MakeScene = (): Scene => {
    
    console.log("==== MakeScene() ====");

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
            console.log("UPDATE");
            const accel = pos.Negate();
            vel = vel.Add(accel.Times(dT));
            pos = pos.Add(vel.Times(dT));
         },
        Render: (canvas: ScalingCanvas) => { 
            console.log("RENDER");
            canvas.Clear();
            canvas.FillCircle(pos, 0.1, { brush: "blue" });
        },
    };
};

console.log("About to call Start()");
Start("my-canvas", MakeScene());