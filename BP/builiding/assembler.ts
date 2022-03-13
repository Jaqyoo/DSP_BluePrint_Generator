import { Building, FactoryList } from "./builiding";

export class Assembler extends Building {
    constructor(
        area_index:number,
        local_offset_x:number,
        local_offset_y:number,
        local_offset_z:number,
        level = 3) 
    {
        let item_id: number, model_index: number
        if (level == 1) {
            item_id = 2303
            model_index = 65
        }
        else if (level == 2) {
            item_id = 2304
            model_index = 66
        }
        else if (level == 3) {
            item_id = 2305
            model_index = 67
        }

        super(area_index, 
            local_offset_x, local_offset_y, local_offset_z,
            local_offset_x, local_offset_y, local_offset_z,
            item_id, model_index)
    }
}


export class AssemblerList extends FactoryList {
    lst: Assembler[]
    constructor(
        area_index:number,
        local:[number, number, number],
        recipe_id:number,
        count=[1,1],
        diff=[3.75,3.75],
        level = 2
    ) {
        let item_id: number, model_index: number
        if (level == 1) {
            item_id = 2303
            model_index = 65
        }
        else if (level == 2) {
            item_id = 2304
            model_index = 66
        }
        else if (level == 3) {
            item_id = 2305
            model_index = 67
        }

        super(area_index, item_id, model_index, [1.75, 1.75], count, local[0], local[1], local[2], recipe_id, diff)
    }

}