import { BluePrint } from "../BP/blueprint";
import { Belt, BeltList, BeltParam } from "../BP/builiding/belt";
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
    
    building_group_iron_plate_0:NearlySmelterGroup
    building_group_iron_plate_1:NearlySmelterGroup
    belt_iron_plate_ingress: Array<Belt>
    belt_iron_plate_ingress_z = 5
    belt_iron_plate_egress_z = 6
    belt_iron_plate_egress: Array<Belt>
    iron_plate_local:[number, number]

    building_group_magnet_plate_0:NearlySmelterGroup
    building_group_magnet_plate_1:NearlySmelterGroup
    building_group_magnet_plate_2:NearlySmelterGroup
    belt_magnet_plate_ingress: Array<Belt>
    belt_magnet_plate_ingress_z = 5
    belt_magnet_plate_egress_z = 6
    belt_magnet_plate_egress: Array<Belt>
    magnet_plate_local:[number, number]

    building_group_copper_0:NearlySmelterGroup
    building_group_copper_1:NearlySmelterGroup
    building_group_copper_2:NearlySmelterGroup
    belt_copper_plate_ingress: Array<Belt>
    belt_copper_plate_ingress_z = 5
    belt_copper_plate_egress_z = 6
    belt_copper_plate_egress: Array<Belt>
    copper_plate_local:[number, number]

    constructor(
        bp: BluePrint,
        area_index: number,
        local: [number, number]
    ) 
    {
        super()
        this.labs = new BuildingList()
        let belt_param:BeltParam
        let tmp_local:[number, number]

        //铁块
        this.iron_plate_local = [local[0], local[1]]
        this.belt_iron_plate_egress = new Array()
        this.belt_iron_plate_ingress = new Array()
        tmp_local = this.iron_plate_local
        this.building_group_iron_plate_0 = bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 1)) as NearlySmelterGroup
        tmp_local = [tmp_local[0], tmp_local[1] + 5]
        this.building_group_iron_plate_1 = bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 1)) as NearlySmelterGroup
        this.belt_iron_plate_ingress = this.belt_iron_plate_ingress.concat(this.building_group_iron_plate_0.ingress_belts.getList()).concat(this.building_group_iron_plate_1.ingress_belts.getList())
        this.belt_iron_plate_egress = this.belt_iron_plate_egress.concat(this.building_group_iron_plate_0.egress_belts.getList()).concat(this.building_group_iron_plate_1.egress_belts.getList())


        let belt_iron_ingress_local = [this.iron_plate_local[0] + 12, this.iron_plate_local[1] + 8]
        for (let index = 0; index < 12; index++) {
            let belt = this.belt_iron_plate_ingress[index];
            belt.setLocal(belt_iron_ingress_local[0] - index, belt_iron_ingress_local[1], this.belt_iron_plate_ingress_z)
        }
        for (let index = 12; index < this.belt_iron_plate_ingress.length; index++) {
            let belt = this.belt_iron_plate_ingress[index];
            belt.setLocal(belt_iron_ingress_local[0] - 24 + index + 1, belt_iron_ingress_local[1] + 1, this.belt_iron_plate_ingress_z)
        }
        this.belt_iron_plate_ingress.forEach((belt, index, belts) => {
            if (index != belts.length - 1) {
                let next_belt = belts[index + 1]
                belt.connect(next_belt)
            }
        })
        belt_param = this.belt_iron_plate_ingress[0].param as BeltParam
        this.belt_iron_plate_ingress[0].header.parameter_count = belt_param.setLabel(1001)
        
        let belt_iron_egress_local = [this.iron_plate_local[0] + 12, this.iron_plate_local[1] + 4]
        for (let index = 0; index < 12; index++) {
            let belt = this.belt_iron_plate_egress[index];
            belt.setLocal(belt_iron_egress_local[0] - index, belt_iron_egress_local[1], this.belt_iron_plate_egress_z)
        }
        for (let index = 12; index < this.belt_iron_plate_egress.length; index++) {
            let belt = this.belt_iron_plate_egress[index];
            belt.setLocal(belt_iron_egress_local[0] - 24 + index + 1, belt_iron_egress_local[1] - 1, this.belt_iron_plate_egress_z)
        }
        this.belt_iron_plate_egress.forEach((belt, index, belts) => {
            if (index != belts.length - 1) {
                let next_belt = belts[index + 1]
                belt.connect(next_belt)
            }
        })
        belt_param = this.belt_iron_plate_egress[this.belt_iron_plate_egress.length - 1].param as BeltParam
        this.belt_iron_plate_egress[this.belt_iron_plate_egress.length - 1].header.parameter_count = belt_param.setLabel(1101)


        //磁铁
        this.magnet_plate_local = [local[0], local[1] + 10]
        tmp_local = this.magnet_plate_local
        this.belt_magnet_plate_egress = new Array()
        this.belt_magnet_plate_ingress = new Array()
        this.building_group_magnet_plate_0 = bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 2)) as NearlySmelterGroup
        tmp_local = [tmp_local[0], tmp_local[1] + 5]
        this.building_group_magnet_plate_1 = bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 2)) as NearlySmelterGroup
        tmp_local = [tmp_local[0], tmp_local[1] + 5]
        this.building_group_magnet_plate_2 = bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 2)) as NearlySmelterGroup
        this.belt_magnet_plate_ingress = this.belt_magnet_plate_ingress.concat(this.building_group_magnet_plate_0.ingress_belts.getList())
                                        .concat(this.building_group_magnet_plate_1.ingress_belts.getList())
                                        .concat(this.building_group_magnet_plate_2.ingress_belts.getList())
        this.belt_magnet_plate_egress = this.belt_magnet_plate_egress.concat(this.building_group_magnet_plate_0.egress_belts.getList())
                                        .concat(this.building_group_magnet_plate_1.egress_belts.getList())
                                        .concat(this.building_group_magnet_plate_2.egress_belts.getList())

        let belt_magnet_ingress_local = [this.magnet_plate_local[0] + 12, this.magnet_plate_local[1] + 8]
        for (let index = 0; index < 12; index++) {
            let belt = this.belt_magnet_plate_ingress[index];
            belt_magnet_ingress_local = [belt_magnet_ingress_local[0] - 1, belt_magnet_ingress_local[1]]
            belt.setLocal(belt_magnet_ingress_local[0], belt_magnet_ingress_local[1], this.belt_magnet_plate_ingress_z)
        }
        belt_magnet_ingress_local = [belt_magnet_ingress_local[0] - 1, belt_magnet_ingress_local[1] + 1]
        for (let index = 12; index < 24; index++) {
            let belt = this.belt_magnet_plate_ingress[index];
            belt_magnet_ingress_local = [belt_magnet_ingress_local[0] + 1, belt_magnet_ingress_local[1]]
            belt.setLocal(belt_magnet_ingress_local[0], belt_magnet_ingress_local[1], this.belt_magnet_plate_ingress_z)
        }
        belt_magnet_ingress_local = [belt_magnet_ingress_local[0] + 1, belt_magnet_ingress_local[1] + 1]
        for (let index = 24; index < this.belt_magnet_plate_ingress.length; index++) {
            let belt = this.belt_magnet_plate_ingress[index];
            belt_magnet_ingress_local = [belt_magnet_ingress_local[0] - 1, belt_magnet_ingress_local[1]]
            belt.setLocal(belt_magnet_ingress_local[0], belt_magnet_ingress_local[1], this.belt_magnet_plate_ingress_z)
        }
        this.belt_magnet_plate_ingress.forEach((belt, index, belts) => {
            if (index != belts.length - 1) {
                let next_belt = belts[index + 1]
                belt.connect(next_belt)
            }
        })
        belt_param = this.belt_magnet_plate_ingress[0].param as BeltParam
        this.belt_magnet_plate_ingress[0].header.parameter_count = belt_param.setLabel(1001)
        this.belt_magnet_plate_ingress.forEach((belt, index, array)=>console.log("index " + index + " local: " + belt.header.local_offset_x))
        
        let belt_magnet_egress_local = [this.magnet_plate_local[0], this.magnet_plate_local[1] + 1 ]
        for (let index = 0; index < 12; index++) {
            let belt = this.belt_magnet_plate_egress[index];
            belt_magnet_egress_local = [belt_magnet_egress_local[0] + 1, belt_magnet_egress_local[1]]
            belt.setLocal(belt_magnet_egress_local[0], belt_magnet_egress_local[1], this.belt_magnet_plate_egress_z)
        }
        belt_magnet_egress_local = [belt_magnet_egress_local[0] + 1, belt_magnet_egress_local[1] + 1]
        for (let index = 12; index < 24; index++) {
            let belt = this.belt_magnet_plate_egress[index];
            belt_magnet_egress_local = [belt_magnet_egress_local[0] - 1, belt_magnet_egress_local[1]]
            belt.setLocal(belt_magnet_egress_local[0], belt_magnet_egress_local[1], this.belt_magnet_plate_egress_z)
        }
        belt_magnet_egress_local = [belt_magnet_egress_local[0] - 1, belt_magnet_egress_local[1] + 1]
        for (let index = 24; index < this.belt_magnet_plate_egress.length; index++) {
            let belt = this.belt_magnet_plate_egress[index];
            belt_magnet_egress_local = [belt_magnet_egress_local[0] + 1, belt_magnet_egress_local[1]]
            belt.setLocal(belt_magnet_egress_local[0], belt_magnet_egress_local[1], this.belt_magnet_plate_egress_z)
        }

        this.belt_magnet_plate_egress.forEach((belt, index, belts) => {
            if (index != belts.length - 1) {
                let next_belt = belts[index + 1]
                belt.connect(next_belt)
            }
        })
        belt_param = this.belt_magnet_plate_egress[this.belt_magnet_plate_egress.length - 1].param as BeltParam
        this.belt_magnet_plate_egress[this.belt_magnet_plate_egress.length - 1].header.parameter_count = belt_param.setLabel(1102)
        this.belt_magnet_plate_egress.forEach((belt, index, array)=>console.log("index " + index + " local: " + belt.header.local_offset_x))

        //铜块
        this.copper_plate_local = [local[0], local[1] + 25]
        this.belt_copper_plate_egress = new Array()
        this.belt_copper_plate_ingress = new Array()
        tmp_local = this.copper_plate_local
        this.building_group_copper_0 = bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 3)) as NearlySmelterGroup
        this.belt_copper_plate_ingress = this.belt_copper_plate_ingress.concat(this.building_group_copper_0.ingress_belts.getList())
        this.belt_copper_plate_egress = this.belt_copper_plate_egress.concat(this.building_group_copper_0.egress_belts.getList())

        tmp_local = [tmp_local[0], tmp_local[1] + 5]
        this.building_group_copper_1 = bp.addBuildings(new NearlySmelterGroup(bp, area_index, tmp_local, 3)) as NearlySmelterGroup
        this.belt_copper_plate_ingress = this.belt_copper_plate_ingress.concat(this.building_group_copper_1.ingress_belts.getList())
        this.belt_copper_plate_egress = this.belt_copper_plate_egress.concat(this.building_group_copper_1.egress_belts.getList())

        let belt_copper_ingress_local = [this.copper_plate_local[0] + 12, this.copper_plate_local[1] + 8]
        for (let index = 0; index < 12; index++) {
            let belt = this.belt_copper_plate_ingress[index];
            belt.setLocal(belt_copper_ingress_local[0] - index, belt_copper_ingress_local[1], this.belt_copper_plate_ingress_z)
        }
        for (let index = 12; index < this.belt_copper_plate_ingress.length; index++) {
            let belt = this.belt_copper_plate_ingress[index];
            belt.setLocal(belt_copper_ingress_local[0] - 24 + index + 1, belt_copper_ingress_local[1] + 1, this.belt_copper_plate_ingress_z)
        }
        this.belt_copper_plate_ingress.forEach((belt, index, belts) => {
            if (index != belts.length - 1) {
                let next_belt = belts[index + 1]
                belt.connect(next_belt)
            }
        })
        belt_param = this.belt_copper_plate_ingress[0].param as BeltParam
        this.belt_copper_plate_ingress[0].header.parameter_count = belt_param.setLabel(1002)
        
        let belt_copper_egress_local = [this.copper_plate_local[0] + 12, this.copper_plate_local[1] + 4]
        for (let index = 0; index < 12; index++) {
            let belt = this.belt_copper_plate_egress[index];
            belt.setLocal(belt_copper_egress_local[0] - index, belt_copper_egress_local[1], this.belt_copper_plate_egress_z)
        }
        for (let index = 12; index < this.belt_copper_plate_egress.length; index++) {
            let belt = this.belt_copper_plate_egress[index];
            belt.setLocal(belt_copper_egress_local[0] - 24 + index + 1, belt_copper_egress_local[1] - 1, this.belt_copper_plate_egress_z)
        }
        this.belt_copper_plate_egress.forEach((belt, index, belts) => {
            if (index != belts.length - 1) {
                let next_belt = belts[index + 1]
                belt.connect(next_belt)
            }
        })
        belt_param = this.belt_copper_plate_egress[this.belt_copper_plate_egress.length - 1].param as BeltParam
        this.belt_copper_plate_egress[this.belt_copper_plate_egress.length - 1].header.parameter_count = belt_param.setLabel(1104)

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
        (bp.addBuildings(new BeltList(area_index, 16, [tmp_local[0], tmp_local[1], 2], [0,1,0])) as BeltList)
    }
}