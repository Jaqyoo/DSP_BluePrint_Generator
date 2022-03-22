import { Belt } from "./belt";
import { Building } from "../building";

export class SprayCoater extends Building {
    constructor(
        area_index:number,
        local:[number, number, number] = null,
        yaw: number = 0
    ) {
        super(area_index, local, undefined, 2313, 120, true)
        this.header.output_to_slot = 14
        this.header.input_from_slot = 15
        this.header.output_from_slot = 15
        this.header.input_to_slot = 14
        this.header.yaw = yaw
        this.header.yaw2 = yaw
    }

    setLocalByBelt(belt:Belt, yaw:number): void {
        this.setLocal(belt.getLocal())
        this.setYaw(yaw)
    }
}