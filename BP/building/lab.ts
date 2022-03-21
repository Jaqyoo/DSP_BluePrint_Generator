import { local_diff } from "../../util";
import { Building } from "./building";
import { AccelerateMode as AccelerateMode, BuildingParamDefault, IBuildingParam } from "./building_param";
import { InserterLocalParam } from "./inserter";

export enum LabsParamResearch {
    Reasearch = 2,
    Produce = 1,
}

class LabParams implements IBuildingParam {
    isReseach = LabsParamResearch.Produce
    accelateMode = AccelerateMode.Increase

    constructor(isResearch:LabsParamResearch, mode = AccelerateMode.Accerlerate) {
        this.isReseach = isResearch
        this.accelateMode = mode
    }
    getCount(): number {
        return 2
    }
    toJSON(): Object {
        return {"Unknown": [this.isReseach, this.accelateMode == AccelerateMode.Accerlerate ? 0 : 1]}
    }
}

export class Lab extends Building {
    constructor(
        area_index:number,
        local:[number, number, number]  = null,
        param_research: LabsParamResearch,
        recipe_id?: number,
        mode?:AccelerateMode
    ) {
        super(area_index, local, local, 2901, 70, false)
        this.header.output_to_slot = 14
        this.header.input_from_slot = 15
        this.header.output_from_slot = 15
        this.header.input_to_slot = 14
        this.setParam(new LabParams(param_research, mode))
        if (param_research == LabsParamResearch.Produce) {
            this.header.recipe_id = recipe_id
        }
    }
    
    getInserterLocal(slot: number, is_ingress: boolean): InserterLocalParam {
        let param = new InserterLocalParam()
        let local: [number, number, number][]
        let local_base = this.getLocal()

        switch (slot) {
            case 0:
            case 1:
            case 2:
                local = [local_diff(local_base, [(slot - 1)*0.8, -1.8, 0]), local_diff(local_base, [(slot - 1)*0.8, -3, 0])]
                break;

            case 3:
            case 4:
            case 5:
                local = [local_diff(local_base, [1.8, (slot - 4), 0]), local_diff(local_base, [2.8, (slot - 4), 0])]
                break;

            case 6:
            case 7:
            case 8:
                local = [local_diff(local_base, [(7 - slot)*0.8, 1.8, 0]), local_diff(local_base, [(7 - slot)*0.8, 2, 0])]
                break;

            case 9:
            case 10:
            case 11:
                local = [local_diff(local_base, [-1.8, (10 -slot), 0]), local_diff(local_base, [-2.8, (10 - slot), 0])]
                break;
        }

        if (is_ingress) {
            param.output_to_slot = slot
            param.setOutputObject(this)
            param.local2 = local[0]
            param.local = local[1]
        }
        else {
            param.input_from_slot = slot
            param.setInputObject(this)
            param.local2 = local[1]
            param.local = local[0]
        }
        return param
    }
}

export class LabStack {
    labs: Array<Lab>

    constructor(
        area_index:number,
        local:[number, number] = null,
        param_research: LabsParamResearch,
        stack = 15,
        recipe_id?: number,
        accelerate_mode = AccelerateMode.Accerlerate
    )
    {
        if (local === null) local = [0, 0]
        this.labs = new Array()
        for (let index = 0; index < stack; index++) {
            let lab = new Lab(area_index, [local[0], local[1], index*3], param_research, recipe_id)
            this.labs.push(lab)
        }
    }

    initLabStacks() {
        this.labs.forEach((lab, index, labs)=> {
            if(index > 0) {
                lab.header.input_object_index = labs[index - 1].header.index
            }
        })      
    }

    setLocal(local:[number, number] | Array<number>) {
        this.labs.forEach((lab, index) => lab.setLocal([local[0], local[1], index * 3]))
    }

    getLabs() {return this.labs}

    getLocal() {return this.labs[0].getLocal()}
    
    getInserterLocal(slot: number, is_ingress: boolean): InserterLocalParam {
        return this.labs[0].getInserterLocal(slot, is_ingress)
    }
}
