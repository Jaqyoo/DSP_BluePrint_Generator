import { Building } from "./builiding";

export class Inserter extends Building {
    constructor(
        area_index:number,
        local:[number,number,number],
        local2:[number,number,number],
        output_object_index:number,
        input_object_index:number,
        output_to_slot:number,
        input_from_slot:number,
        output_from_slot:number,
        input_to_slot:number,
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
        
        super(area_index, local[0], local[1], local[2], local2[0], local2[1], local2[2], item_id, model_index)
        this.header.output_object_index = output_object_index
        this.header.input_object_index = input_object_index
        this.header.output_to_slot = output_to_slot
        this.header.input_from_slot = input_from_slot
        this.header.output_from_slot = output_from_slot
        this.header.input_to_slot = input_to_slot

        // Todo: Support yaw calculate in next version
        if (local[0] == local2[0]) {
            if (local[1] < local2[1]){
                this.header.yaw = 0
                this.header.yaw2 = 0
            }
            else {
                this.header.yaw = 180
                this.header.yaw2 = 180
            }
        }  
        else if (local[1] == local2[1]) {
            // Todo: Confirm it
            if (local[0] < local2[0]){
                this.header.yaw = 90
                this.header.yaw2 = 90
            }
            else {
                this.header.yaw = 270
                this.header.yaw2 = 270
            }
        }
    }
}