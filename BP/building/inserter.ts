import { Building } from "../building";

export class InserterLocalParam {
    local:[number, number, number]
    local2:[number, number, number]
    output_object_index: number
    input_object_index: number
    output_to_slot: number
    input_from_slot: number 
    output_from_slot: number 
    input_to_slot: number

    constructor(
        local:[number, number, number] = null,
        local2:[number, number, number] = null,
        output_object_index = 4294967295,
        input_object_index = 4294967295,
        output_to_slot = -1,
        input_from_slot = -1,
        output_from_slot = -1,
        input_to_slot = -1,
    ) {
        this.local = local
        this.local2 = local2
        this.output_object_index = output_object_index
        this.input_object_index = input_object_index
        this.output_to_slot = output_to_slot
        this.input_from_slot = input_from_slot
        this.output_from_slot = output_from_slot
        this.input_to_slot = input_to_slot
    }

    setInputObject(building:Building) { this.input_object_index = building.header.index }
    setOutputObject(building:Building) { this.output_object_index = building.header.index }
    setOutputToSlot(slot: number) {this.output_to_slot = slot}
    setOutputFromSlot(slot: number) {this.output_from_slot = slot}
    setInputToSlot(slot: number) {this.input_to_slot = slot}
    setInputFromSlot(slot: number) {this.input_from_slot = slot}
}

export class Inserter extends Building {
    constructor(
        area_index:number,
        local_param:InserterLocalParam = new InserterLocalParam(),
        level = 3
    ) {
        let item_id: number, model_index: number

        if (level == 1 ) {
            item_id = 2011
            model_index = 41
        }
        else if (level == 2 ) {
            item_id = 2012
            model_index = 42
        }
        else {
            item_id = 2013
            model_index = 43
        }
        
        super(area_index, local_param.local, local_param.local2, item_id, model_index)
        this.setLocalParam(local_param)
    }

    setLocalParam(local_param: InserterLocalParam) {
        this.header.output_object_index = local_param.output_object_index
        this.header.input_object_index = local_param.input_object_index
        this.header.output_to_slot = local_param.output_to_slot
        this.header.input_from_slot = local_param.input_from_slot
        this.header.output_from_slot = local_param.output_from_slot
        this.header.input_to_slot = local_param.input_to_slot

        if (local_param.local !== null && local_param.local2 !== null) {
            this.setLocal(local_param.local, local_param.local2)
        }
    }
}