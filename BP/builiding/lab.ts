import { Building, BuildingList, BuilidingParam } from "./builiding";

class LabParams extends BuilidingParam {
    Unknown:[number, number]
    constructor(isResearch:boolean) {
        super()
        if (isResearch) {
            this.Unknown = [2, 0]
        }
        else {
            this.Unknown = [1, 0]
        }
    }

    getCount(): number {
        return this.Unknown.length
    }
}

export class Lab extends Building {
    constructor(
        area_index:number,
        local_offset_x:number,
        local_offset_y:number,
        local_offset_z:number,
        isResearch: boolean,
        recipe_id?: number,
    ) {
        super(area_index, local_offset_x, local_offset_y, local_offset_z, local_offset_x, local_offset_y, local_offset_z, 2901, 70, false)
        this.header.output_to_slot = 14
        this.header.input_from_slot = 15
        this.header.output_from_slot = 15
        this.header.input_to_slot = 14
        this.param = new LabParams(isResearch)
        this.header.parameter_count = this.param.getCount()
        if (!isResearch) {
            this.header.recipe_id = recipe_id
        }
    }
}

export class LabStack extends BuildingList {
    constructor(
        area_index:number,
        local_offset_x:number,
        local_offset_y:number,
        isResearch: boolean,
        stack = 15,
        recipe_id?: number,
    )
    {
        super()
        for (let index = 0; index < stack; index++) {
            let lab = new Lab(area_index, local_offset_x, local_offset_y, index*3, isResearch, recipe_id)
            this.push(lab)
        }
    }

    initLabStacks() {
        this.forEach((lab, index, labs)=> {
            if(index > 0) {
                lab.header.input_object_index = labs[index - 1].header.index
            }
        })      
    }
}
