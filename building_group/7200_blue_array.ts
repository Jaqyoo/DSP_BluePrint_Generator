import { BluePrint } from "../BP/blueprint";
import { Belt, BeltList, BeltBlueprintParam, setBeltsLocalAndConnect, appendBelts } from "../BP/builiding/belt";
import { BuildingList } from "../BP/builiding/builiding";
import { LabStack } from "../BP/builiding/lab";
import { SprayCoater } from "../BP/builiding/spray_coater";
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
    belt_iron_plate_ingress_z = 8
    belt_iron_plate_egress_z = 6
    belt_iron_plate_egress: Array<Belt>
    belts_iron_plate: Array<Array<Belt>>
    iron_plate_local:[number, number]
    belt_iron_plate_ingress_local: [number, number, number]
    spray_coater_iron_ore_0:SprayCoater
    spray_coater_iron_plate:Array<SprayCoater>

    building_group_magnet_plate_0:NearlySmelterGroup
    building_group_magnet_plate_1:NearlySmelterGroup
    building_group_magnet_plate_2:NearlySmelterGroup
    belt_magnet_plate_ingress: Array<Belt>
    belt_magnet_plate_ingress_z = 5
    belt_magnet_plate_egress_z = 6
    belt_magnet_plate_egress: Array<Belt>
    belts_magnet_plate: Array<Array<Belt>>
    magnet_plate_local:[number, number]
    belt_magnet_plate_ingress_local:[number, number, number]
    spray_coater_iron_ore_1:SprayCoater
    spray_coater_magnet_plate:Array<SprayCoater>

    building_group_copper_0:NearlySmelterGroup
    building_group_copper_1:NearlySmelterGroup
    building_group_copper_2:NearlySmelterGroup
    belt_copper_plate_ingress: Array<Belt>
    belt_copper_plate_ingress_z = 5
    belt_copper_plate_egress_z = 6
    belt_copper_plate_egress: Array<Belt>
    belts_copper_plate: Array<Array<Belt>>
    copper_plate_local:[number, number]
    belt_copper_plate_ingress_local:[number, number, number]
    spray_coater_copper_ore:SprayCoater
    spray_coater_copper_plate:Array<SprayCoater>

    constructor(
        bp: BluePrint,
        area_index: number,
        local: [number, number]
    ) 
    {
        super()
        this.labs = new BuildingList()
        let belt_param:BeltBlueprintParam
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

        appendBelts(bp, this.belt_iron_plate_ingress, 7)
        this.belt_iron_plate_ingress_local = [local[0] + 2, local[1] + 32, 8]
        setBeltsLocalAndConnect(this.belt_iron_plate_ingress, this.belt_iron_plate_ingress.length, [this.belt_iron_plate_ingress_local[0], this.belt_iron_plate_ingress_local[1], this.belt_iron_plate_ingress_z], [0, -1, 0])
        this.spray_coater_iron_ore_0 = bp.addBuilding(new SprayCoater(area_index, this.belt_iron_plate_ingress[3].header.local_offset_x, this.belt_iron_plate_ingress[3].header.local_offset_y, this.belt_iron_plate_ingress_z, 180))
        this.belt_iron_plate_ingress[0].header.parameter_count = (this.belt_iron_plate_ingress[0].param as BeltBlueprintParam).setLabel(1001)
    
        this.belts_iron_plate = new Array(4)
        this.belts_iron_plate.forEach(belts => belts = new Array<Belt>());
        this.spray_coater_iron_plate = new Array<SprayCoater>()
        let belt_iron_egress_local = [local[0] + 4, this.iron_plate_local[1] + 3 ]
        for(let line = 0; line < 4; line ++) {
            let y = belt_iron_egress_local[1] + line
            this.belts_iron_plate[line] = this.belt_iron_plate_egress.slice(line * 6, line * 6 + 6)
            appendBelts(bp, this.belts_iron_plate[line], 6)
            setBeltsLocalAndConnect(this.belts_iron_plate[line], 12, [belt_iron_egress_local[0], y, this.belt_iron_plate_egress_z], [1, 0, 0])
            belt_param = this.belts_iron_plate[line][this.belts_iron_plate[line].length - 1].param as BeltBlueprintParam
            this.belts_iron_plate[line][this.belts_iron_plate[line].length - 1].header.parameter_count = belt_param.setLabel(1101)

            let spray_coater = bp.addBuilding(new SprayCoater(area_index, this.belts_iron_plate[line][9].header.local_offset_x, y, this.belt_iron_plate_egress_z, 90))
            this.spray_coater_iron_plate.push(spray_coater)
        }

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

        this.belt_magnet_plate_ingress_local = [local[0] - 34, local[1] + 1, 8]
        appendBelts(bp, this.belt_magnet_plate_ingress, 7)
        setBeltsLocalAndConnect(this.belt_magnet_plate_ingress, this.belt_magnet_plate_ingress.length, this.belt_magnet_plate_ingress_local, [1, 0, 0])
        this.belt_magnet_plate_ingress_local = [this.belt_magnet_plate_ingress_local[0] + 37, this.belt_magnet_plate_ingress_local[1] + 37, this.belt_magnet_plate_ingress_local[2]]
        setBeltsLocalAndConnect(this.belt_magnet_plate_ingress, 37, this.belt_magnet_plate_ingress_local, [0, -1, 0])
        this.belt_magnet_plate_ingress_local = [this.belt_magnet_plate_ingress_local[0] + 12, this.belt_magnet_plate_ingress_local[1] - 12, this.belt_magnet_plate_ingress_local[2]]
        setBeltsLocalAndConnect(this.belt_magnet_plate_ingress, 12, this.belt_magnet_plate_ingress_local, [-1, 0, 0])
        this.spray_coater_iron_ore_1 = bp.addBuilding(new SprayCoater(area_index, this.belt_magnet_plate_ingress[3].header.local_offset_x, this.belt_magnet_plate_ingress[3].header.local_offset_y, this.belt_magnet_plate_ingress_local[2], 90))
        this.belt_magnet_plate_ingress[0].header.parameter_count = (this.belt_magnet_plate_ingress[0].param as BeltBlueprintParam).setLabel(1001)
        
        this.belts_magnet_plate = new Array(4)
        this.belts_magnet_plate.forEach(belts => {
            belts = new Array<Belt>()
        });

        this.spray_coater_magnet_plate = new Array<SprayCoater>()
        let belt_magnet_egress_local = [local[0] + 1, local[1] + 7]
        for(let line = 0; line < 4; line ++) {
            let y = belt_magnet_egress_local[1] + line
            this.belts_magnet_plate[line] = this.belt_magnet_plate_egress.slice(line * 9, line * 9 + 9)
            appendBelts(bp, this.belts_magnet_plate[line], 6)
            setBeltsLocalAndConnect(this.belts_magnet_plate[line], 15, [belt_magnet_egress_local[0], y, this.belt_magnet_plate_egress_z], [1, 0, 0])
            belt_param = this.belts_magnet_plate[line][this.belts_magnet_plate[line].length - 1].param as BeltBlueprintParam
            this.belts_magnet_plate[line][this.belts_magnet_plate[line].length - 1].header.parameter_count = belt_param.setLabel(1102)

            let spray_coater = bp.addBuilding(new SprayCoater(area_index, this.belts_magnet_plate[line][12].header.local_offset_x, y, this.belt_magnet_plate_egress_z, 90))
            this.spray_coater_magnet_plate.push(spray_coater)
        }

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

        this.belts_copper_plate = new Array(4)
        this.belts_copper_plate.forEach(belts => {
            belts = new Array<Belt>()
        });

        this.spray_coater_copper_plate = new Array<SprayCoater>()
        let belt_copper_egress_local = [local[0] + 4, local[1] + 11]
        for(let line = 0; line < 4; line ++) {
            let y = belt_copper_egress_local[1] + line
            this.belts_copper_plate[line] = this.belt_copper_plate_egress.slice(line * 6, line * 6 + 6)
            appendBelts(bp, this.belts_copper_plate[line], 6)
            setBeltsLocalAndConnect(this.belts_copper_plate[line], 12, [belt_copper_egress_local[0], y, this.belt_copper_plate_egress_z], [1, 0, 0])
            belt_param = this.belts_copper_plate[line][this.belts_copper_plate[line].length - 1].param as BeltBlueprintParam
            this.belts_copper_plate[line][this.belts_copper_plate[line].length - 1].header.parameter_count = belt_param.setLabel(1104)

            let spray_coater = bp.addBuilding(new SprayCoater(area_index, this.belts_copper_plate[line][9].header.local_offset_x, y, this.belt_copper_plate_egress_z, 90))
            this.spray_coater_copper_plate.push(spray_coater)
        }

        
        appendBelts(bp, this.belt_copper_plate_ingress, 7)
        this.belt_copper_plate_ingress_local = [local[0] + 1, local[1] + 32, 8]
        setBeltsLocalAndConnect(this.belt_copper_plate_ingress, this.belt_copper_plate_ingress.length, [this.belt_copper_plate_ingress_local[0], this.belt_copper_plate_ingress_local[1], this.belt_copper_plate_ingress_local[2]], [0, -1, 0])
        this.spray_coater_copper_ore = bp.addBuilding(new SprayCoater(area_index, this.belt_copper_plate_ingress[3].header.local_offset_x, this.belt_copper_plate_ingress[3].header.local_offset_y, this.belt_copper_plate_ingress[3].header.local_offset_z, 180))
        this.belt_copper_plate_ingress[0].header.parameter_count = (this.belt_copper_plate_ingress[0].param as BeltBlueprintParam).setLabel(1002)

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