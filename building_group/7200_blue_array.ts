import { BluePrint } from "../BP/blueprint";
import { Assembler } from "../BP/building/assembler";
import { Belt, connectBelts } from "../BP/building/belt";
import { AccelerateMode } from "../BP/building/building_param";
import { Inserter } from "../BP/building/inserter";
import { LabsParamResearch, LabStack } from "../BP/building/lab";
import { Smelter } from "../BP/building/smelter";
import { SprayCoater } from "../BP/building/spray_coater";
import { TeslaCoil } from "../BP/building/tesla_coil";
import { local_diff, local_diff_2 } from "../util";
import { smelter_index, assembler_index, belt_index, ingress_inserter_index, building_num, belt_num, egress_inserter_index } from "./7200_blue_array_params";
// import { NearlyAssembler2In1Group } from "./assembler_group";

/**
 * 蓝糖： 288/增产 (20 * 15)
 * 磁线圈：16/加速
 * 磁铁：36/加速
 * 铜块：24/加速
 * 电路板：16/加速
 * 铁块：24/加速
 */
export class BlueArray7200 {

    bp: BluePrint
    area_index: number

    labs: Array<LabStack>
    smelters: Array<Array<Smelter>>
    assemblers: Array<Array<Assembler>>
    belts: Array<Array<Belt>>
    spray_coaters: Array<SprayCoater>
    inserters_ingress: Array<Array<Inserter>>
    inserters_egress: Array<Array<Inserter>>

    tesla_coil: Array<TeslaCoil> 

    station:any

    private init_buildings(bp:BluePrint, area_index:number) {
        this.smelters = new Array(smelter_index.max)
        for(let i = 0; i < smelter_index.max; i++) this.smelters[i] = new Array<Smelter>()
        for(let i = 0; i < building_num.iron_plate; i++) {
            let smelter = new Smelter(area_index, null)
            bp.addBuilding(smelter)
            smelter.setRecipe(1)
            this.smelters[smelter_index.iron_plate].push(smelter)
        }
        for(let i = 0; i < building_num.magnet_plate; i++) {
            let smelter = new Smelter(area_index, null)
            bp.addBuilding(smelter)
            smelter.setRecipe(2)
            this.smelters[smelter_index.magnet_plate].push(smelter)
        }
        for(let i = 0; i < building_num.copper_plate; i++) {
            let smelter = new Smelter(area_index, null)
            bp.addBuilding(smelter)
            smelter.setRecipe(3)
            this.smelters[smelter_index.copper_plate].push(smelter)
        }

        this.assemblers = new Array(assembler_index.max)
        for(let i = 0; i < assembler_index.max; i++)  this.assemblers[i] = new Array<Assembler>()
        for(let i = 0; i < building_num.circuit_board; i++) {
            let assembler = new Assembler(area_index, null)
            bp.addBuilding(assembler) 
            assembler.setRecipe(50)
            this.assemblers[assembler_index.circuit_board].push(assembler)
        }
        for(let i = 0; i < building_num.magnetism_wire; i++) {
            let assembler = new Assembler(area_index, null)
            bp.addBuilding(assembler) 
            assembler.setRecipe(6)
            this.assemblers[assembler_index.magnetism_wire].push(assembler)
        }

        this.spray_coaters = new Array<SprayCoater>()
        for(let i = 0; i <= belt_index.circuit_board_3; i++) {
            let spray_coater = bp.addBuilding(new SprayCoater(area_index, null)) as SprayCoater
            this.spray_coaters.push(spray_coater)
        }

        this.labs = new Array<LabStack>()
        for(let i = 0; i < building_num.blue_matrix; i++) {
            let lab_stack:LabStack = new LabStack(area_index, null, LabsParamResearch.Produce, undefined, 9, AccelerateMode.Increase) 
            lab_stack.getLabs().forEach(lab => bp.addBuilding(lab))
            lab_stack.initLabStacks()
            this.labs.push(lab_stack)
        }

        // Todo: station

        this.tesla_coil = new Array()
    }

    private init_belts(bp:BluePrint, area_index:number) {
        this.belts = new Array(belt_index.max)
        for(let i = 0; i < belt_index.max; i++) this.belts[i] = new Array<Belt>()

        for(let i = 0; i < belt_num.iron_ore_0; i++) this.belts[belt_index.iron_ore_0].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.iron_ore_1; i++) this.belts[belt_index.iron_ore_1].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.copper_ore; i++) this.belts[belt_index.copper_ore].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        
        for(let i = 0; i < belt_num.iron_plate_0; i++) this.belts[belt_index.iron_plate_0].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.iron_plate_1; i++) this.belts[belt_index.iron_plate_1].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.iron_plate_2; i++) this.belts[belt_index.iron_plate_2].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.iron_plate_3; i++) this.belts[belt_index.iron_plate_3].push(bp.addBuilding(new Belt(area_index, null)) as Belt)

        for(let i = 0; i < belt_num.magnet_plate_0; i++) this.belts[belt_index.magnet_plate_0].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.magnet_plate_1; i++) this.belts[belt_index.magnet_plate_1].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.magnet_plate_2; i++) this.belts[belt_index.magnet_plate_2].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.magnet_plate_3; i++) this.belts[belt_index.magnet_plate_3].push(bp.addBuilding(new Belt(area_index, null)) as Belt)

        for(let i = 0; i < belt_num.copper_plate_0; i++) this.belts[belt_index.copper_plate_0].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.copper_plate_1; i++) this.belts[belt_index.copper_plate_1].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.copper_plate_2; i++) this.belts[belt_index.copper_plate_2].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.copper_plate_3; i++) this.belts[belt_index.copper_plate_3].push(bp.addBuilding(new Belt(area_index, null)) as Belt)

        for(let i = 0; i < belt_num.magnetism_wire_0; i++) this.belts[belt_index.magnetism_wire_0].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.magnetism_wire_1; i++) this.belts[belt_index.magnetism_wire_1].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.magnetism_wire_2; i++) this.belts[belt_index.magnetism_wire_2].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.magnetism_wire_3; i++) this.belts[belt_index.magnetism_wire_3].push(bp.addBuilding(new Belt(area_index, null)) as Belt)

        for(let i = 0; i < belt_num.circuit_board_0; i++) this.belts[belt_index.circuit_board_0].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.circuit_board_1; i++) this.belts[belt_index.circuit_board_1].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.circuit_board_2; i++) this.belts[belt_index.circuit_board_2].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.circuit_board_3; i++) this.belts[belt_index.circuit_board_3].push(bp.addBuilding(new Belt(area_index, null)) as Belt)

        
        for(let i = 0; i < belt_num.blue_array_0; i++) this.belts[belt_index.blue_matrix_0].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.blue_array_1; i++) this.belts[belt_index.blue_matrix_1].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.blue_array_2; i++) this.belts[belt_index.blue_matrix_2].push(bp.addBuilding(new Belt(area_index, null)) as Belt)
        for(let i = 0; i < belt_num.blue_array_3; i++) this.belts[belt_index.blue_matrix_3].push(bp.addBuilding(new Belt(area_index, null)) as Belt)

        
        this.belts[belt_index.iron_ore_0][0].setLabel(1001)
        this.belts[belt_index.iron_ore_1][0].setLabel(1001)
        this.belts[belt_index.copper_ore][0].setLabel(1002)

        this.belts[belt_index.iron_plate_0][7].setLabel(1101)
        this.belts[belt_index.iron_plate_1][7].setLabel(1101)
        this.belts[belt_index.iron_plate_2][7].setLabel(1101)
        this.belts[belt_index.iron_plate_3][7].setLabel(1101)

        this.belts[belt_index.magnet_plate_0][10].setLabel(1102)
        this.belts[belt_index.magnet_plate_1][10].setLabel(1102)
        this.belts[belt_index.magnet_plate_2][10].setLabel(1102)
        this.belts[belt_index.magnet_plate_3][10].setLabel(1102)

        this.belts[belt_index.copper_plate_0][7].setLabel(1104)
        this.belts[belt_index.copper_plate_1][7].setLabel(1104)
        this.belts[belt_index.copper_plate_2][7].setLabel(1104)
        this.belts[belt_index.copper_plate_3][7].setLabel(1104)
        
        this.belts[belt_index.magnetism_wire_0][5].setLabel(1202)
        this.belts[belt_index.magnetism_wire_1][5].setLabel(1202)
        this.belts[belt_index.magnetism_wire_2][5].setLabel(1202)
        this.belts[belt_index.magnetism_wire_3][5].setLabel(1202)
        
        this.belts[belt_index.circuit_board_0][5].setLabel(1301)
        this.belts[belt_index.circuit_board_1][5].setLabel(1301)
        this.belts[belt_index.circuit_board_2][5].setLabel(1301)
        this.belts[belt_index.circuit_board_3][5].setLabel(1301)
        
        this.belts[belt_index.blue_matrix_0][8].setLabel(6001)
        this.belts[belt_index.blue_matrix_1][8].setLabel(6001)
        this.belts[belt_index.blue_matrix_2][8].setLabel(6001)
        this.belts[belt_index.blue_matrix_3][8].setLabel(6001)

    }

    private init_ingress_inserters(bp:BluePrint, area_index:number) {
        // init inserter
        this.inserters_ingress = new Array(ingress_inserter_index.max)
        for(let i = 0; i < ingress_inserter_index.max; i++) this.inserters_ingress[i] = new Array<Inserter>()
        for(let i = 0; i < building_num.iron_plate; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_ingress[ingress_inserter_index.iron_plate].push(inserter)
        }

        for(let i = 0; i < building_num.magnet_plate; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_ingress[ingress_inserter_index.magnet_plate].push(inserter)
        }
        for(let i = 0; i < building_num.copper_plate; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_ingress[ingress_inserter_index.copper_plate].push(inserter)
        }
        for(let i = 0; i < building_num.circuit_board; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_ingress[ingress_inserter_index.circuit_board_0].push(inserter)
        }
        for(let i = 0; i < building_num.circuit_board; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_ingress[ingress_inserter_index.circuit_board_1].push(inserter)
        }
        for(let i = 0; i < building_num.magnetism_wire; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_ingress[ingress_inserter_index.magnetism_wire_0].push(inserter)
        }
        for(let i = 0; i < building_num.magnetism_wire; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_ingress[ingress_inserter_index.magnetism_wire_1].push(inserter)
        }
        for(let i = 0; i < building_num.blue_matrix; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_ingress[ingress_inserter_index.blue_matrix_0].push(inserter)
        }
        for(let i = 0; i < building_num.blue_matrix; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_ingress[ingress_inserter_index.blue_matrix_1].push(inserter)
        }
    }

    private init_egress_inserters(bp:BluePrint, area_index:number) {
        this.inserters_egress = new Array(egress_inserter_index.max)
        for(let i = 0; i < egress_inserter_index.max; i++) this.inserters_egress[i] = new Array<Inserter>()
        for(let i = 0; i < building_num.iron_plate; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_egress[egress_inserter_index.iron_plate].push(inserter)
        }
        for(let i = 0; i < building_num.magnet_plate; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_egress[egress_inserter_index.magnet_plate].push(inserter)
        }
        for(let i = 0; i < building_num.copper_plate; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_egress[egress_inserter_index.copper_plate].push(inserter)
        }
        for(let i = 0; i < building_num.circuit_board; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_egress[egress_inserter_index.circuit_board].push(inserter)
        }
        for(let i = 0; i < building_num.magnetism_wire; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_egress[egress_inserter_index.magnetism_wire].push(inserter)
        }
        for(let i = 0; i < building_num.blue_matrix; i++) {
            let inserter = new Inserter(area_index)
            bp.addBuilding(inserter)
            this.inserters_egress[egress_inserter_index.blue_matrix].push(inserter)
        }

    }

    addTeslaCoil(local:[number, number]) {
        let tesla_coil = new TeslaCoil(this.area_index, local)
        this.bp.addBuilding(tesla_coil)
        this.tesla_coil.push(tesla_coil)
    }

    private setSmeltersLocal(local_base:[number, number, number]) {
        let smelter_diff_12 = Array<[number, number,number]>()
        smelter_diff_12[0] = [1, 1, 0]

        for (let i = 1; i < 6; i++) {
            smelter_diff_12[i] = local_diff(smelter_diff_12[i - 1], [2.5, 0, 0])
            if (i == 3) smelter_diff_12[i] = local_diff(smelter_diff_12[i], [0.5, 0, 0])
        }
        for (let i = 6; i < 12; i++) smelter_diff_12[i] = local_diff(smelter_diff_12[i - 6], [0, 2.5, 1.3])
        
        let local_base_smelter_iron_plate = local_diff(local_base, [0, 0, 0])
        for (let i = 0; i < 12; i++) this.smelters[smelter_index.iron_plate][i].setLocal(local_diff(local_base_smelter_iron_plate, smelter_diff_12[i]))
        this.addTeslaCoil(local_diff_2(local_base_smelter_iron_plate, [7.55, 2.5, 0]))
        for (let i = 12; i < 24; i++) this.smelters[smelter_index.iron_plate][i].setLocal(local_diff(local_diff(local_base_smelter_iron_plate, [0, 5, 0]), smelter_diff_12[i - 12]))        
        this.addTeslaCoil(local_diff_2(local_base_smelter_iron_plate, [7.55, 7.5, 0]))
        
        let local_base_smelter_copper_plate = local_diff(local_base, [0, 10, 0])
        for (let i = 0; i < 12; i++) this.smelters[smelter_index.copper_plate][i].setLocal(local_diff(local_base_smelter_copper_plate, smelter_diff_12[i]))
        this.addTeslaCoil(local_diff_2(local_base_smelter_copper_plate, [7.55, 2.5, 0]))
        for (let i = 12; i < 24; i++) this.smelters[smelter_index.copper_plate][i].setLocal(local_diff(local_diff(local_base_smelter_copper_plate, [0, 5, 0]), smelter_diff_12[i - 12]))
        this.addTeslaCoil(local_diff_2(local_base_smelter_copper_plate, [7.55, 7.5, 0]))

        let local_base_smelter_magnet_plate = local_diff(local_base, [0, 20, 0])
        for (let i = 0; i < 12; i++) this.smelters[smelter_index.magnet_plate][i].setLocal(local_diff(local_base_smelter_magnet_plate, smelter_diff_12[i]))
        this.addTeslaCoil(local_diff_2(local_base_smelter_magnet_plate, [7.55, 2.5, 0]))
        for (let i = 12; i < 24; i++) this.smelters[smelter_index.magnet_plate][i].setLocal(local_diff(local_diff(local_base_smelter_magnet_plate, [0, 5, 0]), smelter_diff_12[i - 12]))
        this.addTeslaCoil(local_diff_2(local_base_smelter_magnet_plate, [7.55, 7.5, 0]))
        for (let i = 24; i < 36; i++) this.smelters[smelter_index.magnet_plate][i].setLocal(local_diff(local_diff(local_base_smelter_magnet_plate, [0, 10, 0]), smelter_diff_12[i -24]))
        this.addTeslaCoil(local_diff_2(local_base_smelter_magnet_plate, [7.55, 12.5, 0]))
    }

    private setAssemblersLocal(local_base:[number, number, number]) {
        let assembler_diff_8 = Array<[number, number, number]>()
        assembler_diff_8[0] = [1.75, 0, 0]
        assembler_diff_8[1] = [5.25, 0, 0]
        assembler_diff_8[2] = [9.25, 0, 0]
        assembler_diff_8[3] = [12.75, 0, 0]
        for (let i = 4; i < 8; i ++) assembler_diff_8[i] = local_diff(assembler_diff_8[i - 4], [0, 3.5, 1.3])

        let local_base_assembler_circuit_board = local_diff(local_base, [15.5, 1.5, 0])
        for (let i = 0; i < 8; i++) this.assemblers[assembler_index.circuit_board][i].setLocal(local_diff(local_base_assembler_circuit_board, assembler_diff_8[i]))
        this.addTeslaCoil(local_diff_2(local_base_assembler_circuit_board, [7.25, 3.5, 0]))
        for (let i = 8; i < 16; i++) this.assemblers[assembler_index.circuit_board][i].setLocal(local_diff(local_diff(local_base_assembler_circuit_board, [0,7,0]), assembler_diff_8[i - 8]))
        this.addTeslaCoil(local_diff_2(local_base_assembler_circuit_board, [7.25, 7.0, 0]))

        let local_base_assembler_magnetism_wire = local_diff(local_base, [15.5, 15.5, 0])
        for (let i = 0; i < 8; i++) this.assemblers[assembler_index.magnetism_wire][i].setLocal(local_diff(local_base_assembler_magnetism_wire, assembler_diff_8[i]))
        this.addTeslaCoil(local_diff_2(local_base_assembler_magnetism_wire, [7.25, 3.5, 0]))
        for (let i = 8; i < 16; i++) this.assemblers[assembler_index.magnetism_wire][i].setLocal(local_diff(local_diff(local_base_assembler_magnetism_wire, [0,7,0]), assembler_diff_8[i - 8]))
        this.addTeslaCoil(local_diff_2(local_base_assembler_magnetism_wire, [7.25, 7, 0]))

    }

    private setLabsLocal(local_base:[number, number, number]) {
        let local_base_lab_1 = local_diff(local_base, [0, 38, 0])
        for (let i = 0; i < 7; i++) {
            this.labs[i].setLocal(local_diff(local_diff(local_base_lab_1, [2.5, 0, 0]), [5 * i, 0, 0]))
            if (i < 5) {
                this.setIngressInserterWithLab(ingress_inserter_index.blue_matrix_0, i, this.labs[i], 2, belt_index.magnetism_wire_0, i)
                this.setIngressInserterWithLab(ingress_inserter_index.blue_matrix_1, i,  this.labs[i], 1, belt_index.circuit_board_0, i)
                this.setEgressInserterWithLab(egress_inserter_index.blue_matrix, i,  this.labs[i], 0, belt_index.blue_matrix_0, i)
            }
            else {
                this.setIngressInserterWithLab(ingress_inserter_index.blue_matrix_0, i,  this.labs[i], 2, belt_index.magnetism_wire_1, i - 5)
                this.setIngressInserterWithLab(ingress_inserter_index.blue_matrix_1, i,  this.labs[i], 1, belt_index.circuit_board_1, i - 5)
                this.setEgressInserterWithLab(egress_inserter_index.blue_matrix, i,  this.labs[i], 0, belt_index.blue_matrix_1, i - 5)
            }
        }
        this.addTeslaCoil(local_diff_2(local_base_lab_1, [9.75, -3, 0]))
        this.addTeslaCoil(local_diff_2(local_base_lab_1, [25.75, -3, 0]))

        let local_base_lab_2 = local_diff(local_base, [32.25,0,0])
        for (let i = 7; i < 12; i++) {
            this.labs[i].setLocal(local_diff(local_diff(local_base_lab_2, [0, 2.5, 0]), [0, 5*(i - 7), 0]))
            if (i < 10) {
                this.setIngressInserterWithLab(ingress_inserter_index.blue_matrix_0, i,  this.labs[i], 3, belt_index.magnetism_wire_0, i - 5)
                this.setIngressInserterWithLab(ingress_inserter_index.blue_matrix_1, i,  this.labs[i], 4, belt_index.circuit_board_0, i - 5)
                this.setEgressInserterWithLab(egress_inserter_index.blue_matrix, i,  this.labs[i], 5, belt_index.blue_matrix_0, i - 5)
            }
            else {
                this.setIngressInserterWithLab(ingress_inserter_index.blue_matrix_0,  i, this.labs[i], 3, belt_index.magnetism_wire_1, i - 10)
                this.setIngressInserterWithLab(ingress_inserter_index.blue_matrix_1, i,  this.labs[i], 4, belt_index.circuit_board_1, i - 10)
                this.setEgressInserterWithLab(egress_inserter_index.blue_matrix, i,  this.labs[i], 5, belt_index.blue_matrix_1, i - 10)
            }
        }
        for (let i = 12; i < building_num.blue_matrix; i++) {
            this.labs[i].setLocal(local_diff(local_diff(local_base_lab_2, [6.5, 2.5, 0]), [0, 5*(i - 12), 0]))
            if (i < 15) {
                this.setIngressInserterWithLab(ingress_inserter_index.blue_matrix_0, i,  this.labs[i], 9, belt_index.magnetism_wire_0, i - 10)
                this.setIngressInserterWithLab(ingress_inserter_index.blue_matrix_1,  i, this.labs[i], 10, belt_index.circuit_board_0, i - 10)
                this.setEgressInserterWithLab(egress_inserter_index.blue_matrix,  i, this.labs[i], 11, belt_index.blue_matrix_0, i - 10)
            }
            else {
                this.setIngressInserterWithLab(ingress_inserter_index.blue_matrix_0,  i, this.labs[i], 9, belt_index.magnetism_wire_1, i - 15)
                this.setIngressInserterWithLab(ingress_inserter_index.blue_matrix_1, i,  this.labs[i], 10, belt_index.circuit_board_1, i - 15)
                this.setEgressInserterWithLab(egress_inserter_index.blue_matrix,  i, this.labs[i], 11, belt_index.blue_matrix_1, i - 15)
            }
        }
        this.addTeslaCoil(local_diff_2(local_base_lab_2, [3.5, 9.25, 0]))
        this.addTeslaCoil(local_diff_2(local_base_lab_2, [3.5, 19.25, 0]))
        this.addTeslaCoil(local_diff_2(local_base_lab_2, [3.5, 31.25, 0]))
    }

    private setBeltsAndSprayCoaterLocal(local_base:[number, number, number]) {
        // // set belts and spray roater
        let local_base_copper_ore:[number, number, number] = [3, 31, 6]
        this.belts[belt_index.copper_ore].forEach((belt, index) => {belt.setLocal(local_diff(local_base_copper_ore, [0, -1 * index, 0]))})
        this.spray_coaters[belt_index.copper_ore].setLocalByBelt(this.belts[belt_index.copper_ore][3], 180)

        let local_base_iron_ore_0:[number, number, number] = [4, 31, 6]
        this.belts[belt_index.iron_ore_0].forEach((belt, index) => {belt.setLocal(local_diff(local_base_iron_ore_0, [0, -1 * index, 0]))})
        this.spray_coaters[belt_index.iron_ore_0].setLocalByBelt(this.belts[belt_index.iron_ore_0][3], 180)

        // 24 + 18
        let local_base_iron_ore_1_0:[number, number, number] = [5 + 17, 25, 6]
        let local_base_iron_ore_1_1:[number, number, number] = [5, 25, 6]
        this.belts[belt_index.iron_ore_1].forEach((belt, index) => {
            if (index < 18) belt.setLocal(local_diff(local_base_iron_ore_1_0, [-1 * index, 0, 0]))
            else belt.setLocal(local_diff(local_base_iron_ore_1_1, [0, -1 * (index - 18), 0]))
        })
        this.spray_coaters[belt_index.iron_ore_1].setLocalByBelt(this.belts[belt_index.iron_ore_1][3], 90)

        let local_base_belt_iron_plate:[number, number, number] = [10, 1, 5]
        for(let i = belt_index.iron_plate_0; i <= belt_index.iron_plate_3; i++) {
            this.belts[i].forEach((belt, index) => {belt.setLocal(local_diff(local_diff(local_base_belt_iron_plate, [0, i - belt_index.iron_plate_0, 0]), [1 * index, 0, 0]))})
            this.spray_coaters[i].setLocalByBelt(this.belts[i][9], 90)
        }
        
        let local_base_belt_magnet_plate:[number, number, number] = [7, 5, 5]
        for(let i = belt_index.magnet_plate_0; i <= belt_index.magnet_plate_3; i++) {
            this.belts[i].forEach((belt, index) => {belt.setLocal(local_diff(local_diff(local_base_belt_magnet_plate, [0, i - belt_index.magnet_plate_0, 0]), [1 * index, 0, 0]))})
            this.spray_coaters[i].setLocalByBelt(this.belts[i][12], 90)
        }

        let local_base_belt_copper_plate:[number, number, number] = [2, 9, 5]
        for(let i = belt_index.copper_plate_0; i <= belt_index.copper_plate_3; i++) {
            this.belts[i].forEach((belt, index) => {belt.setLocal(local_diff(local_diff(local_base_belt_copper_plate, [0, i - belt_index.copper_plate_0, 0]), [1 * index, 0, 0]))})
            this.spray_coaters[i].setLocalByBelt(this.belts[i][9], 90)
        }

        let local_base_belt_circuit_board:[number, number, number] = [12, 13, 5]
        for(let i = belt_index.circuit_board_0; i <= belt_index.circuit_board_3; i++) {
            this.belts[i].forEach((belt, index) => {belt.setLocal(local_diff(local_diff(local_base_belt_circuit_board, [0, i - belt_index.circuit_board_0, 0]), [1 * index, 0, 0]))})
            this.spray_coaters[i].setLocalByBelt(this.belts[i][7], 90)
        }

        let local_base_belt_magnetism_wire:[number, number, number] = [12, 17, 5]
        for(let i = belt_index.magnetism_wire_0; i <= belt_index.magnetism_wire_3; i++) {
            this.belts[i].forEach((belt, index) => {belt.setLocal(local_diff(local_diff(local_base_belt_magnetism_wire, [0, i - belt_index.magnetism_wire_0, 0]), [1 * index, 0, 0]))})
            this.spray_coaters[i].setLocalByBelt(this.belts[i][7], 90)
        }

        let local_base_belt_blue_array:[number, number, number] = [3, 21, 5]
        for(let i = belt_index.blue_matrix_0; i <= belt_index.blue_matrix_3; i++) {
            this.belts[i].forEach((belt, index) => {belt.setLocal(local_diff(local_diff(local_base_belt_blue_array, [0, i - belt_index.blue_matrix_0, 0]), [1 * index, 0, 0]))})
        }

        this.belts.forEach((belts, index) => {
            connectBelts(belts)
        })

    }

    constructor(
        bp: BluePrint,
        area_index: number,
        local: [number, number]
    ) {
        this.bp = bp
        this.area_index = area_index

        this.init_buildings(bp, area_index)
        this.init_belts(bp, area_index)
        this.init_ingress_inserters(bp, area_index)
        this.init_egress_inserters(bp, area_index)

        // set local
        // set building
        let local_base:[number, number, number] = [local[0], local[1], 0]
        this.setSmeltersLocal(local_base)
        this.setAssemblersLocal(local_base)
        this.setBeltsAndSprayCoaterLocal(local_base)
        this.setLabsLocal(local_base)


        this.setIngressInserterWithSmelter(ingress_inserter_index.iron_plate, smelter_index.iron_plate, belt_index.iron_ore_0)
        this.setIngressInserterWithSmelter(ingress_inserter_index.magnet_plate, smelter_index.magnet_plate, belt_index.iron_ore_1)
        this.setIngressInserterWithSmelter(ingress_inserter_index.copper_plate, smelter_index.copper_plate, belt_index.copper_ore)
        this.setEgressInserterWithSmelter(egress_inserter_index.iron_plate, smelter_index.iron_plate, belt_index.iron_plate_0, 4)
        this.setEgressInserterWithSmelter(egress_inserter_index.magnet_plate, smelter_index.magnet_plate, belt_index.magnet_plate_0, 4)
        this.setEgressInserterWithSmelter(egress_inserter_index.copper_plate, smelter_index.copper_plate, belt_index.copper_plate_0, 4)

        this.setIngressInserterWithAssembler(ingress_inserter_index.magnetism_wire_0, 2, assembler_index.magnetism_wire, belt_index.magnet_plate_0, 4)
        this.setIngressInserterWithAssembler(ingress_inserter_index.magnetism_wire_1, 1, assembler_index.magnetism_wire, belt_index.copper_plate_0, 2)
        this.setEgressInserterWithAssembler(egress_inserter_index.magnetism_wire, 0, assembler_index.magnetism_wire, belt_index.magnetism_wire_0, 4)

        
        this.setIngressInserterWithAssembler(ingress_inserter_index.circuit_board_0, 2, assembler_index.circuit_board, belt_index.magnet_plate_0, 4)
        this.setIngressInserterWithAssembler(ingress_inserter_index.circuit_board_1, 1, assembler_index.circuit_board, belt_index.copper_plate_2, 2)
        this.setEgressInserterWithAssembler(egress_inserter_index.circuit_board, 0, assembler_index.circuit_board, belt_index.circuit_board_0, 4)
    }

    private setIngressInserterWithSmelter(inserter_index:ingress_inserter_index, smelter_index:smelter_index, belt_index:belt_index) {
        this.inserters_ingress[inserter_index].forEach((inserter, index) => {
            let smelter = this.smelters[smelter_index][index]
            let slot:number =  smelter.getLocal()[2] == 0 ? 6 : 2
            let param = smelter.getInserterLocal(slot, true)
            param.setInputObject(this.belts[belt_index][this.belts[belt_index].length - 1 - index])
            param.setOutputFromSlot(0)
            param.setInputToSlot(1)
            inserter.setLocalParam(param)
        })
    }
    
    // private setIngressInserterWithSmelter1(inserter_index:ingress_inserter_index, inserter_offset:number, smelter:Smelter, slot:number, belt_index:belt_index, belt_offset:number) {
    //     let inserter = this.inserters_ingress[inserter_index][inserter_offset]
    //     let param = smelter.getInserterLocal(slot, true)
    //     param.setInputObject(this.belts[belt_index][belt_offset])
    //     param.setOutputFromSlot(0)
    //     param.setInputToSlot(1)
    //     inserter.setLocalParam(param)
    // }

    private setEgressInserterWithSmelter(inserter_index:egress_inserter_index, smelter_index:smelter_index, belt_index_begin:belt_index, count:number) {
        this.inserters_egress[inserter_index].forEach((inserter, index) => {
            let smelter = this.smelters[smelter_index][index]
            let slot:number =  smelter.getLocal()[2] == 0 ? 7 : 1
            let param = smelter.getInserterLocal(slot, false)
            param.setOutputObject(this.belts[belt_index_begin + Math.floor(index/count)][Math.floor(index/count)])
            param.setOutputToSlot(-1)
            param.setOutputFromSlot(0)
            param.setInputToSlot(1)
            inserter.setLocalParam(param)
        })
    }

    private setIngressInserterWithAssembler(inserter_index:ingress_inserter_index, vslot:number, assembler_index:assembler_index, belt_index_begin:belt_index, count:number) {
        this.inserters_ingress[inserter_index].forEach((inserter, index) => {
            let assembler = this.assemblers[assembler_index][index]
            let slot:number =  assembler.getLocal()[2] == 0 ? 8 - vslot : vslot
            let param = assembler.getInserterLocal(slot, true)
            param.setInputObject(this.belts[belt_index_begin + Math.floor(index/count)][this.belts[belt_index_begin + Math.floor(index/count)].length - 1 - Math.floor(index/count)])
            param.setOutputFromSlot(0)
            param.setInputToSlot(1)
            inserter.setLocalParam(param)
        })
    }
    
    private setEgressInserterWithAssembler(inserter_index:egress_inserter_index, vslot:number, assembler_index:assembler_index, belt_index_begin:belt_index, count:number) {
        this.inserters_egress[inserter_index].forEach((inserter, index) => {
            let assembler = this.assemblers[assembler_index][index]
            let slot:number =  assembler.getLocal()[2] == 0 ? 8 - vslot : vslot
            let param = assembler.getInserterLocal(slot, false)
            param.setOutputObject(this.belts[belt_index_begin + Math.floor(index/count)][Math.floor(index/count)])
            param.setOutputToSlot(-1)
            param.setOutputFromSlot(0)
            param.setInputToSlot(1)
            inserter.setLocalParam(param)
        })
    }

    private setIngressInserterWithLab(inserter_index:ingress_inserter_index, inserter_offset:number, labs:LabStack, slot:number, belt_index:belt_index, belt_offset:number) {
        let inserter = this.inserters_ingress[inserter_index][inserter_offset]
        let param = labs.getInserterLocal(slot, true)
        param.setInputObject(this.belts[belt_index][belt_offset])
        param.setOutputFromSlot(0)
        param.setInputToSlot(1)
        inserter.setLocalParam(param)
    }
    
    private setEgressInserterWithLab(inserter_index:egress_inserter_index, inserter_offset:number, labs:LabStack, slot:number, belt_index:belt_index, belt_offset:number) {
        let inserter = this.inserters_egress[inserter_index][inserter_offset]
        let param = labs.getInserterLocal(slot, false)
        param.setOutputObject(this.belts[belt_index][belt_offset])
        param.setOutputToSlot(-1)
        param.setOutputFromSlot(0)
        param.setInputToSlot(1)
        inserter.setLocalParam(param)
    }
}
