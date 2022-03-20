import { local_diff } from "../../util";
import { Building } from "./building";
import { InserterLocalParam } from "./inserter";

export class Assembler extends Building {
    constructor(
        area_index:number,
        local:[number, number, number] | null,
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

        super(area_index, local,local, item_id, model_index)
    }
    
    getInserterLocal(slot: number, is_ingress: boolean): InserterLocalParam {
        let param = new InserterLocalParam()
        let local: [number, number, number][]
        let local_base = this.getLocal()

        switch (slot) {
            case 0:
            case 1:
            case 2:
                local = [local_diff(local_base, [(1 - slot)*0.8, -0.8, 0]), local_diff(local_base, [(1 -slot)*0.8, -2, 0])]
                break;

            case 3:
            case 4:
            case 5:
                local = [local_diff(local_base, [-0.8, (slot - 5)*0.8, 0]), local_diff(local_base, [-2, (slot - 5)*0.8, 0])]
                break;

            case 6:
            case 7:
            case 8:
                local = [local_diff(local_base, [(slot - 7)*0.8, 0.8, 0]), local_diff(local_base, [(slot - 7)*0.8, 2, 0])]
                break;

            case 9:
            case 10:
            case 11:
                local = [local_diff(local_base, [0.8, (10 - slot)*0.8, 0]), local_diff(local_base, [2, (10 -slot)*0.8,  0])]
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
