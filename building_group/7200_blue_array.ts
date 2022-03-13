import { BluePrint } from "../BP/blueprint";
import { BeltList } from "../BP/builiding/belt";
import { BuildingList } from "../BP/builiding/builiding";
import { LabStack } from "../BP/builiding/lab";
import { NearlyAssembler2In1Group } from "./assembler_group";
import { NearlySmelterGroup } from "./smelter_groups";

/**
 * 蓝糖： 288/增产
 * 磁线圈：16/加速
 * 磁铁：36/加速
 * 铜块：24/加速
 * 电路板：16/加速
 * 铁块：24/加速
 */
export class BlueArray7200 extends BuildingList {
    labs:BuildingList

    constructor(
        bp: BluePrint,
        area_index: number,
        local: [number, number]
    ) 
    {
        super()
        this.labs = new BuildingList()

        let tmp_local:[number, number] = [local[0], local[1]]
        //铁块
        bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 1)) as NearlySmelterGroup
        tmp_local = [tmp_local[0], tmp_local[1] + 5]
        bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 1)) as NearlySmelterGroup
        //磁铁
        tmp_local = [tmp_local[0], tmp_local[1] + 5]
        bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 2)) as NearlySmelterGroup
        tmp_local = [tmp_local[0], tmp_local[1] + 5]
        bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 2)) as NearlySmelterGroup
        tmp_local = [tmp_local[0], tmp_local[1] + 5]
        bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 2)) as NearlySmelterGroup
        //铜块
        tmp_local = [tmp_local[0], tmp_local[1] + 5]
        bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 3)) as NearlySmelterGroup
        tmp_local = [tmp_local[0], tmp_local[1] + 5]
        bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 3)) as NearlySmelterGroup
        
        //磁线圈
        tmp_local = [local[0] + 16, local[1] + 0.25]
        bp.addBuildings(new NearlyAssembler2In1Group(bp, area_index, tmp_local, 6, -0.25, 0.75, 2.75)) as NearlyAssembler2In1Group
        tmp_local = [tmp_local[0], tmp_local[1] + 7]
        bp.addBuildings(new NearlyAssembler2In1Group(bp, area_index, tmp_local, 6, -0.25, 0.75, 2.75)) as NearlyAssembler2In1Group
        //电路板
        tmp_local = [tmp_local[0], tmp_local[1] + 7]
        bp.addBuildings(new NearlyAssembler2In1Group(bp, area_index, tmp_local, 50, -0.25, 0.75, 2.75)) as NearlyAssembler2In1Group
        tmp_local = [tmp_local[0], tmp_local[1] + 7]
        bp.addBuildings(new NearlyAssembler2In1Group(bp, area_index, tmp_local, 50, -0.25, 0.75, 2.75)) as NearlyAssembler2In1Group

        //蓝糖
        let lab:LabStack
        tmp_local = [local[0] + 32, local[1] + 2.25]
        lab = bp.addBuildings(new LabStack(area_index, tmp_local[0], tmp_local[1], false, undefined, 9)) as LabStack
        lab.initLabStacks()
        this.labs.concat(lab)
        for(let i = 0; i < 6; i++) {
            tmp_local = [tmp_local[0], tmp_local[1] + 4.5]
            lab = bp.addBuildings(new LabStack(area_index, tmp_local[0], tmp_local[1], false, undefined, 9)) as LabStack
            lab.initLabStacks()
            this.labs.concat(lab)
        }

        tmp_local = [local[0] + 38.5, local[1] + 2.25]
        lab = bp.addBuildings(new LabStack(area_index, tmp_local[0], tmp_local[1], false, undefined, 9)) as LabStack
        lab.initLabStacks()
        this.labs.concat(lab)
        for(let i = 0; i < 6; i++) {
            tmp_local = [tmp_local[0], tmp_local[1] + 4.5]
            lab = bp.addBuildings(new LabStack(area_index, tmp_local[0], tmp_local[1], false, undefined, 9)) as LabStack
            lab.initLabStacks()
            this.labs.concat(lab)
        }

        tmp_local = [local[0] + 2.25, local[1] + 38.25]
        lab = bp.addBuildings(new LabStack(area_index, tmp_local[0], tmp_local[1], false, undefined, 9)) as LabStack
        lab.initLabStacks()
        this.labs.concat(lab)
        for(let i = 0; i < 5; i++) {
            tmp_local = [tmp_local[0] + 5, tmp_local[1]]
            lab = bp.addBuildings(new LabStack(area_index, tmp_local[0], tmp_local[1], false, undefined, 9)) as LabStack
            lab.initLabStacks()
            this.labs.concat(lab)
        }
    
        tmp_local = [local[0] + 35.5, local[1] + 2.25];
        (bp.addBuildings(new BeltList(area_index, 16, [tmp_local[0], tmp_local[1], 2], [0,1,0])) as BeltList).connect()
    }
}