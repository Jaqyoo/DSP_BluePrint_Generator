import { BluePrint } from "../BP/blueprint";
import { BeltList } from "../BP/builiding/belt";
import { BuildingList } from "../BP/builiding/builiding";
import { Inserter } from "../BP/builiding/inserter";
import { AssemblerList } from "../BP/builiding/assembler";
import { TeslaCoil } from "../BP/builiding/tesla_coil";

export class NearlyAssembler2In1Group extends BuildingList {
    bp: BluePrint
    assemblers_00: AssemblerList
    assemblers_13: AssemblerList
    ingress_belts1: BeltList
    ingress_belts2: BeltList
    egress_belts: BeltList
    ingress_inserters1: Array<Inserter>
    ingress_inserters2: Array<Inserter>
    egress_inserters: Array<Inserter>
    tesla_coil: TeslaCoil

    constructor(
        bp: BluePrint,
        area_index: number,
        local: [number, number],
        recipe_id:number,
        ingress_belt1_offset = 0,
        ingress_belt2_offset = 1,
        egress_belt_offset = 3,
        assembler_level = 3,
        belt_level = 3,
        inserter_level = 3
    ) {
        super()
        this.bp = bp

        let offset = [3.4, 0]

        this.assemblers_00 = bp.addBuildings(new AssemblerList(area_index, [local[0] + 1.0, local[1] + 1.0, 0.0], recipe_id, [2, 1], offset, assembler_level)) as AssemblerList
        this.assemblers_00.concat(bp.addBuildings(new AssemblerList(area_index, [local[0] + 8.5, local[1] + 1.0, 0.0], recipe_id, [2, 1], offset, assembler_level)) as AssemblerList)
        
        this.assemblers_13 = bp.addBuildings(new AssemblerList(area_index, [local[0] + 1.0, local[1] + 4.5, 1.3], recipe_id, [2, 1], offset, assembler_level)) as AssemblerList
        this.assemblers_13.concat(bp.addBuildings(new AssemblerList(area_index, [local[0] + 8.5, local[1] + 4.5, 1.3], recipe_id, [2, 1], offset, assembler_level)) as AssemblerList)

        this.ingress_belts1 = bp.addBuildings(new BeltList(area_index, 8, [local[0], local[1] + ingress_belt1_offset, 5], undefined, belt_level)) as BeltList
        this.ingress_belts2 = bp.addBuildings(new BeltList(area_index, 8, [local[0], local[1] + ingress_belt2_offset, 5], undefined, belt_level)) as BeltList
        this.egress_belts = bp.addBuildings(new BeltList(area_index, 8, [local[0], local[1] + egress_belt_offset, 5], undefined, belt_level)) as BeltList

        this.tesla_coil = bp.addBuilding(new TeslaCoil(area_index, local[0] + 6.5, local[1] + 3)) as TeslaCoil

        this.ingress_inserters1 = new Array<Inserter>()
        this.ingress_inserters2 = new Array<Inserter>()
        this.egress_inserters = new Array<Inserter>()
        this.assemblers_00.forEach((assembler, index, array) => {
            this.ingress_inserters1.push(bp.addBuilding(
                new Inserter(area_index, 
                    [assembler.header.local_offset_x - 1.0, assembler.header.local_offset_y + 1.0, 0], 
                    [assembler.header.local_offset_x - 1.0, assembler.header.local_offset_y + 2.2, 0],
                    this.ingress_belts1.getList()[index*2].header.index, assembler.header.index, 
                    -1, 0, 0, 1)
            ) as Inserter )
            this.ingress_inserters2.push(bp.addBuilding(
                new Inserter(area_index, 
                    [assembler.header.local_offset_x, assembler.header.local_offset_y + 1.0, 0], 
                    [assembler.header.local_offset_x, assembler.header.local_offset_y + 2.2, 0],
                    this.ingress_belts2.getList()[index*2].header.index, assembler.header.index, 
                    -1, 1, 0, 1)
            ) as Inserter )

            this.egress_inserters.push(bp.addBuilding(
                new Inserter(area_index, 
                    [assembler.header.local_offset_x + 1.0, assembler.header.local_offset_y + 2.2, 0],
                    [assembler.header.local_offset_x + 1.0, assembler.header.local_offset_y + 1.0, 0], 
                    assembler.header.index, this.egress_belts.getList()[index*2].header.index, 
                    2, -1, 0, 1)
            ) as Inserter )
        });

        this.assemblers_13.forEach((assembler, index, array) => {
            this.ingress_inserters1.push(bp.addBuilding(
                new Inserter(area_index, 
                    [assembler.header.local_offset_x - 1.0, assembler.header.local_offset_y - 1.0, 1.3], 
                    [assembler.header.local_offset_x - 1.0, assembler.header.local_offset_y - 2.2, 1.3],
                    this.ingress_belts1.getList()[index*2+1].header.index, assembler.header.index, 
                    -1, 8, 0, 1)
            ) as Inserter )
            this.ingress_inserters2.push(bp.addBuilding(
                new Inserter(area_index, 
                    [assembler.header.local_offset_x, assembler.header.local_offset_y - 1.0, 1.3], 
                    [assembler.header.local_offset_x, assembler.header.local_offset_y - 2.2, 1.3],
                    this.ingress_belts1.getList()[index*2+1].header.index, assembler.header.index, 
                    -1, 7, 0, 1)
            ) as Inserter )

            this.egress_inserters.push(bp.addBuilding(
                new Inserter(area_index, 
                    [assembler.header.local_offset_x + 1.0, assembler.header.local_offset_y - 2.2, 1.3],
                    [assembler.header.local_offset_x + 1.0, assembler.header.local_offset_y - 1.0, 1.3], 
                    assembler.header.index, this.egress_belts.getList()[index*2+1].header.index, 
                    6, -1, 0, 1)
            ) as Inserter )
        });
    }
}