import { Building, BuildingList, FactoryList } from "./builiding"

export class Smelter extends Building{
    constructor(
        area_index:number,
        local_offset_x:number,
        local_offset_y:number,
        local_offset_z:number,
        level = 2) 
    {
        let item_id = 2302
        let model_index = 62
        if (level == 2) {
            item_id = 2315
            model_index = 194
        }

        super(area_index, 
            local_offset_x, local_offset_y, local_offset_z,
            local_offset_x, local_offset_y, local_offset_z,
            item_id, model_index)
    }
}

export class SmelterList extends FactoryList {
    lst: Smelter[]
    constructor(
        area_index:number,
        local:[number, number, number],
        count=[1,1],
        diff=[3,3],
        level = 2
    ) {
        let item_id = 2302
        let model_index = 62
        if (level == 2) {
            item_id = 2315
            model_index = 194
        }

        super(area_index, item_id, model_index, [1.25, 1.25], count, local[0], local[1], local[2], diff)
    }

}