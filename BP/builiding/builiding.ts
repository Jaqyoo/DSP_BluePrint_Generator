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
        local_offset_x:number,
        local_offset_y:number,
        local_offset_z:number,
        local_offset_x2:number,
        local_offset_y2:number,
        local_offset_z2:number,
        item_id:number,
        model_index:number,
        isDefault = true
    ) {
        this.header = new BuildingHeader()
        let header = this.header
        header.area_index = area_index //current only support area 0?
        header.local_offset_x = local_offset_x
        header.local_offset_y = local_offset_y
        header.local_offset_z = local_offset_z
        header.local_offset_x2 = local_offset_x2
        header.local_offset_y2 = local_offset_y2
        header.local_offset_z2 = local_offset_z2
    
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
}

export class BuildingList {
    lst:Array<Building>

    constructor() {
        this.lst = new Array<Building>()
    }

    forEach(cb: (value: Building, index: number, array: Building[]) => void, arg?: any) {
        this.lst.forEach(cb, arg)
    }

    concat(buildings:BuildingList) {
        this.lst = this.lst.concat(buildings.lst)
    }

    push(building:Building) {
        this.lst.push(building)
    }
}

export class FactoryList extends BuildingList {
    anti_collision:[number, number]
    direct_positive:[boolean, boolean]
    constructor(
        area_index:number, item_id:number, model_index:number, anti_collision:[number, number],
        count=[1,1],
        x:number, y:number,z:number,
        recipe_id:number,
        diff=[0,0],
        isDefault = true
    ) {
        super()
        this.anti_collision = anti_collision
        this.direct_positive = [diff[0]>0?true:false, diff[1]>0?true:false]

        for (let row = 0; row < count[0]; row++) {
            for (let column = 0; column < count[1]; column++) {
                this.lst.push(
                    new Building(area_index, 
                        x+row*diff[0], y+column*diff[1],z, 
                        x+row*diff[0], y+column*diff[1],z,
                        item_id, model_index, isDefault))
            }
        }
        this.setRecipe(recipe_id)
    }

    setRecipe(recipe_id:number) {
        this.forEach((building, index, buildings) => {
            building.header.recipe_id = recipe_id
        })
    }

    getFactoryArea() {
        let x: number, y: number, x2: number, y2: number
        if (this.direct_positive[0] == true) {
            x = this.lst[0].header.local_offset_x - this.anti_collision[0]
            x2 = this.lst[this.lst.length-1].header.local_offset_x - this.anti_collision[0]
        }
        else {
            x = this.lst[this.lst.length-1].header.local_offset_x - this.anti_collision[0],
            x2 = this.lst[0].header.local_offset_x - this.anti_collision[0]
        }

        if (this.direct_positive[1] == true) {
            y = this.lst[0].header.local_offset_y - this.anti_collision[1]
            y2 = this.lst[this.lst.length-1].header.local_offset_y - this.anti_collision[1]
        }
        else {
            y = this.lst[this.lst.length-1].header.local_offset_y - this.anti_collision[1],
            y2 = this.lst[0].header.local_offset_y - this.anti_collision[1]
        }
        return [x, y, x2, y2]
    }
}