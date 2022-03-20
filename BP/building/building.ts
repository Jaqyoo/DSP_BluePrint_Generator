import { local_diff } from "../../util"
import { InserterLocalParam } from "./inserter"

export class BuildingHeader {
    index: number
    area_index:number
    local_offset_x:number
    local_offset_y:number
    local_offset_z:number
    local_offset_x2:number
    local_offset_y2:number
    local_offset_z2:number
    yaw:number
    yaw2:number
    item_id:number
    model_index:number
    output_object_index:number
    input_object_index:number
    output_to_slot:number
    input_from_slot:number
    output_from_slot:number
    input_to_slot:number
    output_offset:number 
    input_offset:number
    recipe_id:number
    filter_id:number
    parameter_count:number 
}

export class BuilidingParam {
    getCount(){}
}

class BuilidingParamUnknown extends BuilidingParam {
    Unknown:[number]
    constructor() {
        super()
        this.Unknown = [0]
    }

    getCount(): number {
        return this.Unknown.length
    }
}

export class Building {
    header: BuildingHeader
    param: any

    constructor(
        area_index:number,
        local:[number, number, number] = null,
        local2:[number, number, number] = null,
        item_id:number,
        model_index:number,
        isDefault = true
    ) {
        this.header = new BuildingHeader()
        let header = this.header
        header.area_index = area_index

        if (local === null) {
            local = [0, 0, 0]
        }
        if (local2 === null) {
            local2 = local
        }

        header.local_offset_x = local[0]
        header.local_offset_y = local[1]
        header.local_offset_z = local[2]
        header.local_offset_x2 = local2[0]
        header.local_offset_y2 = local2[1]
        header.local_offset_z2 = local2[2]
    
        // how to calculate yaw?
        header.yaw = 0
        header.yaw2 = 0 
    
        header.item_id = item_id
        header.model_index = model_index
        header.output_object_index = 4294967295
        header.input_object_index = 4294967295
    
        header.output_to_slot = 0
        header.input_from_slot = 0
        header.output_from_slot = 0
        header.input_to_slot = 0
    
        header.output_offset = 0
        header.input_offset = 0
    
        header.recipe_id = 0
        header.filter_id = 0
        header.parameter_count = 0

        if (isDefault) {
            this.param = new BuilidingParamUnknown()
            this.header.parameter_count = this.param.getCount()
        }
    }

    setIndex(index:number) {this.header.index = index}

    setLocal(local:[number, number, number], local2:[number,number,number] = null) {
        if (local2 === null) {
            local2 = local
        }

        this.header.local_offset_x = local[0]
        this.header.local_offset_y = local[1]
        this.header.local_offset_z = local[2]

        this.header.local_offset_x2 = local2[0]
        this.header.local_offset_y2 = local2[1]
        this.header.local_offset_z2 = local2[2]

        this.autoSetYaw(local, local2)
    }

    getLocal():[number, number, number] {return [this.header.local_offset_x, this.header.local_offset_y, this.header.local_offset_z]}

    setYaw(yaw:number, yaw2?:number) {
        if (yaw2 === undefined) yaw2 = yaw
        this.header.yaw = yaw
        this.header.yaw2 = yaw2
    }
    
    autoSetYaw(local:[number, number, number], local2:[number, number, number]) {
        // Todo: Support yaw calculate in next version
        if (local[0] == local2[0]) {
            if (local[1] < local2[1]){
                this.setYaw(0)
            }
            else {
                this.setYaw(180)
            }
        }  
        else if (local[1] == local2[1]) {
            // Todo: Confirm it
            if (local[0] < local2[0]){
                this.setYaw(90)
            }
            else {
                this.setYaw(270)
            }
        }
    }

    setRecipe(recipe_id:number) {
        this.header.recipe_id = recipe_id
    }

    getInserterLocal(slot: number, is_ingress: boolean): InserterLocalParam {return null}
}
