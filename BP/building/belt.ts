import { BluePrint } from "../blueprint";
import { Building } from "../building";
import { IBuildingParam } from "../building_param";

export class BeltBlueprintParam implements IBuildingParam {
    hasParam = false
    label:number
    count:number = 0

    constructor(label?:number) {
        if (label === undefined) {
            this.hasParam = false
        }
        else {
            this.label = label
            this.hasParam = true
        }
    }
    getCount(): number {
        if(this.hasParam) return 2
        else return 0
    }

    toJSON():Object  {
        if(this.hasParam) {
            return {"Belt": {label: this.label, count:this.count}}
        }
        else {
            return {"Belt": null}
        }
    }
}

export class Belt extends Building {
    constructor(
        area_index:number,
        local:[number, number, number] | null,
        level=3,
        label?:number
    ) {
        let item_id = 2003
        let model_index = 37

        if (level == 3) {
            item_id = 2003
            model_index = 37
        }

        if (local === null) local = [0, 0, 0]

        super(area_index,local, undefined, item_id, model_index, false)
        this.header.parameter_count = 0
        this.header.output_to_slot = 1
        this.header.input_to_slot = 1
        this.setParam(new BeltBlueprintParam(label))
    }

    connect(next_belt: Belt) {
        this.header.output_object_index = next_belt.header.index
        next_belt.header.input_object_index = this.header.index

        // Todo : Calculate the yaw
        if (this.header.local_offset_x == next_belt.header.local_offset_x) {
            if (this.header.local_offset_y < next_belt.header.local_offset_y) {
                this.header.yaw = 0
                this.header.yaw2 = 0
            }
            else {
                this.header.yaw = 180
                this.header.yaw2 = 180
            }
        }
        else if (this.header.local_offset_y == next_belt.header.local_offset_y) {
            if (this.header.local_offset_x < next_belt.header.local_offset_x) {
                this.header.yaw = 90
                this.header.yaw2 = 90
            }
            else {
                this.header.yaw = 270
                this.header.yaw2 = 270
            }
        }
    }

    setLabel(label:number) {
        this.setParam(new BeltBlueprintParam(label))
    }
}

export function connectBelts(belts:Array<Belt>) {
    belts.forEach((belt, index) => {
        if (index < belts.length - 1) {
            belt.connect(belts[index + 1])
        }
    });
}

export function setBeltsLocalAndConnect(belts:Array<Belt>, count: number, startLocal: [number, number, number], diff: [number, number, number]) {
    for (let index = 0; index < count; index++) {
        let belt = belts[index];
        belt.setLocal([startLocal[0] + diff[0] * index, startLocal[1] + diff[1] * index, startLocal[2] + diff[2] * index])
        if (index < count - 1) {
            belt.connect(belts[index + 1])
        }
    }
}

// undefined diff means you must set belt local later
export function appendBelts(bp: BluePrint, belts: Array<Belt>, count: number, diff?: [number, number, number]) {
    let belt = belts[belts.length - 1]
    let area_index = belt.header.area_index
    let x = belt.header.local_offset_x, y = belt.header.local_offset_y, z = belt.header.local_offset_z
    if (diff === undefined) diff = [0, 0, 0]
    for (let i = 0; i < count; i++) {
        let next_belt = new Belt(area_index, [x + (i+1)*diff[0], y + (i+1)*diff[1], z + (i+1)*diff[2]])
        bp.addBuilding(next_belt)
        if (diff !== [0, 0, 0]) belt.connect(next_belt)
        belts.push(next_belt)
        belt = next_belt
    }
}

export function prependBelts(bp: BluePrint, belts: Array<Belt>, count: number, diff: [number, number, number] = [0, 0, 0]):Array<Belt> {
    let area_index = belts[0].header.area_index
    let tmp_belts:Array<Belt>

    let belt = belts[0]
    let x = belt.header.local_offset_x, y = belt.header.local_offset_y, z = belt.header.local_offset_z

    if (count == 0) return belts
    
    for (let i = 0; i < count; i++) {
        let pre_belt = new Belt(area_index, [x - (i+1)*diff[0], y - (i+1)*diff[1], z - (i+1)*diff[2]])
        bp.addBuilding(pre_belt)
        if (diff !== [0, 0, 0]) pre_belt.connect(belt) 
        tmp_belts = [pre_belt].concat(tmp_belts)
        belt = pre_belt
    }
    tmp_belts = tmp_belts.concat(belts)
    return tmp_belts
}
